import Container from "../../Сontainer/Сontainer";
import "../ProfileInfo/profileInfo.scss";
import profileImage from "../../../assets/images/others/profile.png";
import profile2 from "../../../assets/images/others/profile2.jpeg";
import { useState, useEffect, useRef, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const info = {
  name: "Vilka_blin",
  image: profileImage,
  description: "люблю готовить и вкусно поесть",
  recipes_count: 4,
  followers: 68,
  subscribes: 35,
  likes: 10,
};

const subscribes = [
  {
    id: 1,
    name: "vilka_neblin",
    img: profile2,
  },
  {
    id: 2,
    name: "dlinnoe_nazvanie_ochen1234",
    img: profile2,
  },
  {
    id: 3,
    name: "vilka_neblin",
    img: profileImage,
  },
  {
    id: 4,
    name: "vilka_neblin",
    img: profile2,
  },
];

const followers = [
  {
    id: 1,
    name: "vilka_neblin",
    img: profile2,
  },
  {
    id: 2,
    name: "dlinnoe_nazvanie_ochen1234",
    img: profile2,
  },
  {
    id: 3,
    name: "vilka_neblin",
    img: profileImage,
  },
  {
    id: 4,
    name: "vilka_neblin",
    img: profile2,
  },
];

const ProfileInfo = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [isOpenFollowers, setIsOpenFollowers] = useState(false);
  const [isOpenSubscribes, setIsOpenSubscribes] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Токен отсутствует");
          return;
        }

        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/actions/user/getUserInfo.php`,
          {
            credentials: 'include',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            // mode: 'cors'
          }
        )
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.error("Error:", error));

        const data = await response.json();

        setProfile(data);
      } catch (error) {
        console.error("Ошибка при загрузке данных профиля:", error);
      }
    };

    fetchProfileData();
  }, [isAuthenticated]);

  if (!profile) {
    return <div>Загрузка...</div>;
  }

  const onClickButtonOpenFollowersHandle = () => {
    if (isOpenFollowers) {
      return;
    }

    ref.current.style.overflow = "hidden";

    setIsOpenFollowers(true);
  };

  const onClickButtonCloseFollowersHandle = () => {
    if (!isOpenFollowers) {
      return;
    }

    ref.current.style.overflow = "";

    setIsOpenFollowers(false);
  };

  const onClickButtonOpenSubscribesHandle = () => {
    if (isOpenSubscribes) {
      return;
    }

    ref.current.style.overflow = "hidden";
    setIsOpenSubscribes(true);
  };

  const onClickButtonCloseSubscribesHandle = () => {
    if (!isOpenSubscribes) {
      return;
    }

    ref.current.style.overflow = "";

    setIsOpenSubscribes(false);
  };

  useEffect(() => {
    ref.current = document.body;

    return () => (document.body.style.overflow = "");
  }, []);

  return (
    <Container>
      <div className="profile">
        <div className="profile__image">
          <img src={info.image} alt="profile image" />
        </div>
        <div className="profile__info">
          <div className="profile__nickname">
            <h3>{info.name}</h3>
            <form action="" method="post">
              <input type="hidden" name="userId" />
              <button>
                <svg
                  width="17"
                  height="18"
                  viewBox="0 0 17 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.4997 10.1644H9.66634V15.9977C9.66634 16.3071 9.54342 16.6039 9.32463 16.8227C9.10584 17.0415 8.80909 17.1644 8.49967 17.1644C8.19026 17.1644 7.89351 17.0415 7.67472 16.8227C7.45592 16.6039 7.33301 16.3071 7.33301 15.9977V10.1644H1.49967C1.19026 10.1644 0.893509 10.0415 0.674717 9.82268C0.455924 9.60389 0.333008 9.30714 0.333008 8.99772C0.333008 8.6883 0.455924 8.39156 0.674717 8.17276C0.893509 7.95397 1.19026 7.83105 1.49967 7.83105H7.33301V1.99772C7.33301 1.6883 7.45592 1.39156 7.67472 1.17276C7.89351 0.953971 8.19026 0.831055 8.49967 0.831055C8.80909 0.831055 9.10584 0.953971 9.32463 1.17276C9.54342 1.39156 9.66634 1.6883 9.66634 1.99772V7.83105H15.4997C15.8091 7.83105 16.1058 7.95397 16.3246 8.17276C16.5434 8.39156 16.6663 8.6883 16.6663 8.99772C16.6663 9.30714 16.5434 9.60389 16.3246 9.82268C16.1058 10.0415 15.8091 10.1644 15.4997 10.1644Z"
                    fill="black"
                  />
                </svg>
                Подписаться
              </button>
            </form>
          </div>
          <div className="profile__statistics">
            <p>Рецепты: {info.recipes_count}</p>
            <button
              className="statistics__btn"
              onClick={onClickButtonOpenFollowersHandle}
            >
              Подписчики:{info.followers}
            </button>
            <button
              className="statistics__btn"
              onClick={onClickButtonOpenSubscribesHandle}
            >
              Подписки: {info.subscribes}
            </button>
            <p>Лайки: {info.likes}</p>

            <div className={`${isOpenSubscribes ? "active" : ""} subscribes`}>
              <div className="subscribes__inner">
                <div className="header">
                  <h4>Список подписок {info.name}</h4>
                  <button onClick={onClickButtonCloseSubscribesHandle}>
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14.9999 18.8903L24.7221 28.6125C25.238 29.1283 25.9377 29.4182 26.6673 29.4182C27.3968 29.4182 28.0965 29.1283 28.6124 28.6125C29.1283 28.0966 29.4181 27.3969 29.4181 26.6673C29.4181 25.9377 29.1283 25.238 28.6124 24.7221L18.8866 15L28.6106 5.27779C28.8659 5.02235 29.0684 4.71912 29.2066 4.38541C29.3447 4.0517 29.4157 3.69406 29.4157 3.33289C29.4156 2.97173 29.3444 2.61411 29.2061 2.28047C29.0678 1.94683 28.8651 1.6437 28.6097 1.38837C28.3542 1.13305 28.051 0.930543 27.7173 0.792409C27.3836 0.654276 27.0259 0.583223 26.6648 0.583308C26.3036 0.583393 25.946 0.654614 25.6124 0.792905C25.2787 0.931196 24.9756 1.13385 24.7203 1.38929L14.9999 11.1115L5.27776 1.38929C5.0242 1.12652 4.72085 0.91688 4.38541 0.772599C4.04997 0.628318 3.68915 0.552287 3.32401 0.548943C2.95887 0.545599 2.59672 0.615009 2.25869 0.753122C1.92066 0.891235 1.61353 1.09529 1.3552 1.35337C1.09688 1.61145 0.892536 1.9184 0.754104 2.25629C0.615672 2.59419 0.545921 2.95628 0.548921 3.32142C0.551921 3.68656 0.62761 4.04745 0.771575 4.38303C0.915539 4.71861 1.12489 5.02215 1.38743 5.27596L11.1133 15L1.38926 24.724C1.12673 24.9778 0.917373 25.2813 0.773409 25.6169C0.629445 25.9525 0.553754 26.3134 0.550754 26.6785C0.547754 27.0436 0.617505 27.4057 0.755937 27.7436C0.894369 28.0815 1.09871 28.3885 1.35703 28.6465C1.61536 28.9046 1.9225 29.1087 2.26053 29.2468C2.59855 29.3849 2.9607 29.4543 3.32584 29.451C3.69098 29.4476 4.0518 29.3716 4.38724 29.2273C4.72269 29.083 5.02604 28.8734 5.27959 28.6106L14.9999 18.8903Z"
                        fill="black"
                      />
                    </svg>
                  </button>
                </div>

                <div className="inner__info">
                  {subscribes.map((item, index) => {
                    return (
                      <div className="subscribes__item" key={index}>
                        <div className="subscribes__profile">
                          <div className="profile__img">
                            <img src={item.img} alt={item.name} />
                          </div>

                          <h5>{item.name}</h5>
                        </div>
                        <button className="subscribe__btn">
                          <svg
                            width="17"
                            height="18"
                            viewBox="0 0 17 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15.4997 10.1644H9.66634V15.9977C9.66634 16.3071 9.54342 16.6039 9.32463 16.8227C9.10584 17.0415 8.80909 17.1644 8.49967 17.1644C8.19026 17.1644 7.89351 17.0415 7.67472 16.8227C7.45592 16.6039 7.33301 16.3071 7.33301 15.9977V10.1644H1.49967C1.19026 10.1644 0.893509 10.0415 0.674717 9.82268C0.455924 9.60389 0.333008 9.30714 0.333008 8.99772C0.333008 8.6883 0.455924 8.39156 0.674717 8.17276C0.893509 7.95397 1.19026 7.83105 1.49967 7.83105H7.33301V1.99772C7.33301 1.6883 7.45592 1.39156 7.67472 1.17276C7.89351 0.953971 8.19026 0.831055 8.49967 0.831055C8.80909 0.831055 9.10584 0.953971 9.32463 1.17276C9.54342 1.39156 9.66634 1.6883 9.66634 1.99772V7.83105H15.4997C15.8091 7.83105 16.1058 7.95397 16.3246 8.17276C16.5434 8.39156 16.6663 8.6883 16.6663 8.99772C16.6663 9.30714 16.5434 9.60389 16.3246 9.82268C16.1058 10.0415 15.8091 10.1644 15.4997 10.1644Z"
                              fill="black"
                            />
                          </svg>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className={`${isOpenFollowers ? "active" : ""} subscribes`}>
              <div className="subscribes__inner">
                <div className="header">
                  <h4>Список подпиcчиков {info.name}</h4>
                  <button onClick={onClickButtonCloseFollowersHandle}>
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14.9999 18.8903L24.7221 28.6125C25.238 29.1283 25.9377 29.4182 26.6673 29.4182C27.3968 29.4182 28.0965 29.1283 28.6124 28.6125C29.1283 28.0966 29.4181 27.3969 29.4181 26.6673C29.4181 25.9377 29.1283 25.238 28.6124 24.7221L18.8866 15L28.6106 5.27779C28.8659 5.02235 29.0684 4.71912 29.2066 4.38541C29.3447 4.0517 29.4157 3.69406 29.4157 3.33289C29.4156 2.97173 29.3444 2.61411 29.2061 2.28047C29.0678 1.94683 28.8651 1.6437 28.6097 1.38837C28.3542 1.13305 28.051 0.930543 27.7173 0.792409C27.3836 0.654276 27.0259 0.583223 26.6648 0.583308C26.3036 0.583393 25.946 0.654614 25.6124 0.792905C25.2787 0.931196 24.9756 1.13385 24.7203 1.38929L14.9999 11.1115L5.27776 1.38929C5.0242 1.12652 4.72085 0.91688 4.38541 0.772599C4.04997 0.628318 3.68915 0.552287 3.32401 0.548943C2.95887 0.545599 2.59672 0.615009 2.25869 0.753122C1.92066 0.891235 1.61353 1.09529 1.3552 1.35337C1.09688 1.61145 0.892536 1.9184 0.754104 2.25629C0.615672 2.59419 0.545921 2.95628 0.548921 3.32142C0.551921 3.68656 0.62761 4.04745 0.771575 4.38303C0.915539 4.71861 1.12489 5.02215 1.38743 5.27596L11.1133 15L1.38926 24.724C1.12673 24.9778 0.917373 25.2813 0.773409 25.6169C0.629445 25.9525 0.553754 26.3134 0.550754 26.6785C0.547754 27.0436 0.617505 27.4057 0.755937 27.7436C0.894369 28.0815 1.09871 28.3885 1.35703 28.6465C1.61536 28.9046 1.9225 29.1087 2.26053 29.2468C2.59855 29.3849 2.9607 29.4543 3.32584 29.451C3.69098 29.4476 4.0518 29.3716 4.38724 29.2273C4.72269 29.083 5.02604 28.8734 5.27959 28.6106L14.9999 18.8903Z"
                        fill="black"
                      />
                    </svg>
                  </button>
                </div>

                <div className="inner__info">
                  {followers.map((item, index) => {
                    return (
                      <div className="subscribes__item" key={index}>
                        <div className="subscribes__profile">
                          <div className="profile__img">
                            <img src={item.img} alt={item.name} />
                          </div>

                          <h5>{item.name}</h5>
                        </div>
                        <button className="subscribe__btn">
                          <svg
                            width="17"
                            height="18"
                            viewBox="0 0 17 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15.4997 10.1644H9.66634V15.9977C9.66634 16.3071 9.54342 16.6039 9.32463 16.8227C9.10584 17.0415 8.80909 17.1644 8.49967 17.1644C8.19026 17.1644 7.89351 17.0415 7.67472 16.8227C7.45592 16.6039 7.33301 16.3071 7.33301 15.9977V10.1644H1.49967C1.19026 10.1644 0.893509 10.0415 0.674717 9.82268C0.455924 9.60389 0.333008 9.30714 0.333008 8.99772C0.333008 8.6883 0.455924 8.39156 0.674717 8.17276C0.893509 7.95397 1.19026 7.83105 1.49967 7.83105H7.33301V1.99772C7.33301 1.6883 7.45592 1.39156 7.67472 1.17276C7.89351 0.953971 8.19026 0.831055 8.49967 0.831055C8.80909 0.831055 9.10584 0.953971 9.32463 1.17276C9.54342 1.39156 9.66634 1.6883 9.66634 1.99772V7.83105H15.4997C15.8091 7.83105 16.1058 7.95397 16.3246 8.17276C16.5434 8.39156 16.6663 8.6883 16.6663 8.99772C16.6663 9.30714 16.5434 9.60389 16.3246 9.82268C16.1058 10.0415 15.8091 10.1644 15.4997 10.1644Z"
                              fill="black"
                            />
                          </svg>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <p>
            <span>О себе: </span> {info.description}
          </p>
        </div>
      </div>
    </Container>
  );
};

export default ProfileInfo;
