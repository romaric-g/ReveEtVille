// import { Reducer } from "preact/hooks";

// interface ReducerAction {
//   type: 'next' | 'prev' | 'choose',
//   name: string
// }

// export type SelectionState = {
//   currentStep: string
// }
// export type StoryReducer = Reducer<SelectionState, ReducerAction>;

// const storyReducer: StoryReducer = (prevState, payload) => {
//   const { type, name, value } = payload;

//   const foundIndex = prevState.findIndex((filter) => filter.name === name);

//   switch (type) {
//     case 'next':
//       return [];
//     case 'prev':
//       // - Ajoute le filtre si n'est pas encore présent et que sa valeur n'est pas vide
//       if (foundIndex === -1 && value && value.length > 0) {
//         return [...prevState, { name, value }];
//       }
//       // - Supprime le filtre si sa valeur est null ou ''
//       if (!value || value === '') {
//         return [...prevState.filter((filter) => filter.name !== name)];
//       }
//       // - Sinon, remplace le filtre
//       return [...prevState.filter((filter) => filter.name !== name), { name, value }];
//     case 'choose':

//     default:
//       throw new Error('Unhandled action type');
//   }
// };

// export default storyReducer;
