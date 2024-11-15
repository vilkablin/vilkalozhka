// import React, { useCallback, useEffect, useState } from "react";

// import MainInformationForm from "../components/addRecipe/MainInformationForm";
// import Container from "../components/Сontainer/Сontainer";
// import "../components/addRecipe/addRecipe.scss";
// import IngredientsForm from "../components/addRecipe/IngredientsForm";
// import StagesForm from "../components/addRecipe/StagesForm";

// const [formData, setFormData] = useState({
//   name: '', 
//   description: '',
//   time: 0,
//   portions: 0, 
//   difficulty: '', 
//   ingredients: [], 
//   stages: [] 
// });

// const updateIngredients = (newIngredients) => {
//   setFormData((prevData) => ({
//     ...prevData,
//     ingredients: newIngredients
//   }));
// };

// const updateStages = (newStages) => {
//   setFormData((prevData) => ({
//     ...prevData,
//     stages: newStages
//   }));
// };

// const submitRecipe = async () => {
//   try {
//     const response = await fetch('http://localhost/add_recipe.php', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formData),
//     });

//     const result = await response.json();
//     if (result.status === 'success') {
//       alert('Рецепт успешно добавлен!');
//     } else {
//       alert(`Ошибка: ${result.message}`);
//     }
//   } catch (error) {
//     console.error('Ошибка при отправке формы:', error);
//     alert('Произошла ошибка при отправке данных');
//   }
// };


// const AddRecipe = () => {
//   const [currentPage, setCurrentPage] = useState(0);

//   const [form, setForm] = useState(initialFormState);

//   const onChangeInputHandle = (e) => {
//     setForm((prevState) => {
//       // console.log(e.target.value);

//       prevState = { ...prevState };

//       console.log(e);

//       prevState[e.target.name] = e.target.value.trim();

//       return prevState;
//     });
//   };

//   const components = [
//     <MainInformationForm
//       form={form}
//       onChangeInputHandle={onChangeInputHandle}
//     />,
//     <IngredientsForm form={form} onChangeInputHandle={onChangeInputHandle} />,
//     <StagesForm form={form} onChangeInputHandle={onChangeInputHandle} />,
//   ];

//   const setNextPage = useCallback(() => {
//     setCurrentPage((prevState) => {
//       if (prevState >= components.length - 1) {
//         return prevState;
//       }

//       return prevState + 1;
//     });
//   }, []);

//   const setPrevPage = useCallback(() => {
//     setCurrentPage((prevState) => {
//       if (prevState <= 0) {
//         return prevState;
//       }

//       return prevState - 1;
//     });
//   }, []);

//   useEffect(() => {
//     console.log(currentPage);
//   }, [currentPage]);

//   useEffect(() => {
//     console.log(form);
//   }, [form]);

//   return (
//     <Container>
//       {components[currentPage]}
//       <div className="addForm__btns">
//         <button
//           onClick={setPrevPage}
//           className={`${currentPage == 0 ? "notActive" : ""}  btn--prev`}
//         >
//           Вернуться
//         </button>
//         <button onClick={setNextPage} className={`${currentPage == 2 ? "notActive" : ""}  btn--next`}>
//           Следующий этап{" "}
//           <svg
//             width="27"
//             height="28"
//             viewBox="0 0 27 28"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               fillRule="evenodd"
//               clipRule="evenodd"
//               d="M13.885 4.95233C14.138 4.69944 14.4811 4.55737 14.8388 4.55737C15.1965 4.55737 15.5395 4.69944 15.7925 4.95233L23.8863 13.0461C24.1392 13.2991 24.2812 13.6422 24.2812 13.9999C24.2812 14.3576 24.1392 14.7006 23.8863 14.9536L15.7925 23.0474C15.5381 23.2931 15.1973 23.4291 14.8436 23.426C14.4899 23.4229 14.1516 23.2811 13.9015 23.031C13.6514 22.7808 13.5095 22.4425 13.5064 22.0888C13.5033 21.7351 13.6393 21.3944 13.885 21.1399L19.6762 15.3488L4.04702 15.3488C3.68925 15.3488 3.34614 15.2067 3.09316 14.9537C2.84018 14.7007 2.69805 14.3576 2.69805 13.9999C2.69805 13.6421 2.84018 13.299 3.09316 13.046C3.34614 12.793 3.68925 12.6509 4.04702 12.6509L19.6762 12.6509L13.885 6.85977C13.6322 6.6068 13.4901 6.26375 13.4901 5.90605C13.4901 5.54835 13.6322 5.2053 13.885 4.95233Z"
//               fill="white"
//             />
//           </svg>
//         </button>
//         <button
//   className={`${currentPage !== 2 ? "notActive" : ""}  btn--send btn--next`}
//   onClick={submitRecipe}
// >
//           Выложить рецепт
//           <svg
//             width="24"
//             height="22"
//             viewBox="0 0 24 22"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M2.45794 11.0001L1.67777 4.43041C1.45431 2.55024 3.52356 1.16912 5.35127 1.97991L20.7789 8.81666C22.7487 9.68908 22.7487 12.3112 20.7789 13.1836L5.35127 20.0215C3.52356 20.8311 1.45431 19.4512 1.67777 17.571L2.45794 11.0001ZM2.45794 11.0001H11.4996"
//               stroke="white"
//               strokeWidth="3"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//         </button>
//       </div>
//     </Container>
//   );
// };

// export default AddRecipe;