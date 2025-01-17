// import { Experiment } from "@/api";
import { FrameworkNode } from "./nodes";
import { FrameworkWidget } from "./widgets";

export type FrameworkView = {
  slug: string;
  name: string;
  description: string;
  widgets: FrameworkWidget[];
};

export type FrameworkExperiment = {
  slug: string;
  name: string;
  description: string;
  nodes: FrameworkNode[];
  views: FrameworkView[];
};

/// PLAYGROUND TO CREATE
// const experiment: Experiment = {
//   name: "Short Dark Tetrad",
//   slug: "short-dark-tetrad",
//   description:
//     "The SD4 is a brief (28-item) self-report questionnaire designed to assess the Dark Tetrad of personality: Machiavellianism, narcissism, psychopathy, and sadism. Items can be administered with or without the subheadings.",
//   coverImage:
//     "https://cdn.experiment-hub.com/team/experiment-hub-opengraph.png",
//   team: {
//     pk: 1,
//     name: "Team",
//     slug: "team",
//     coverImage:
//       "https://cdn.experiment-hub.com/team/experiment-hub-opengraph.png",
//     description: "Description",
//     users: [],
//   },
//   answers: 0,
//   nodes: [
//     {
//       id: "start",
//       nodeFamily: "core",
//       nodeType: "start",
//       props: {},
//     },
//     {
//       id: "intro",
//       nodeFamily: "study",
//       nodeType: "experiment-step",
//       props: {
//         slug: "intro",
//       },
//     },
//     {
//       id: "regressors",
//       nodeFamily: "study",
//       nodeType: "experiment-step",
//       props: {
//         slug: "regressors",
//       },
//     },
//     {
//       id: "questions-path",
//       nodeFamily: "control",
//       nodeType: "path",
//       props: {
//         nodes: [
//           {
//             id: "questions-1",
//             nodeFamily: "study",
//             nodeType: "experiment-step",
//             props: {
//               slug: "questions-1",
//             },
//           },
//           {
//             id: "questions-2",
//             nodeFamily: "study",
//             nodeType: "experiment-step",
//             props: {
//               slug: "questions-2",
//             },
//           },
//           {
//             id: "questions-3",
//             nodeFamily: "study",
//             nodeType: "experiment-step",
//             props: {
//               slug: "questions-3",
//             },
//           },
//           {
//             id: "questions-4",
//             nodeFamily: "study",
//             nodeType: "experiment-step",
//             props: {
//               slug: "questions-4",
//             },
//           },
//         ],
//         randomize: true,
//         stepper: true,
//         stepperLabel: "Pantalla {n} de {t}",
//         stepperStyle: "discrete",
//       },
//     },
//     {
//       id: "end",
//       nodeFamily: "core",
//       nodeType: "finish",
//       props: {},
//     },
//   ],
//   views: [
//     {
//       name: "Intro",
//       description: "Intro",
//       slug: "intro",
//       widgets: [
//         {
//           widgetFamily: "content",
//           template: "rich_text",
//           props: {
//             content: "# Algo algo Short Dark Tetrad",
//           },
//         },
//         {
//           widgetFamily: "layout",
//           template: "button",
//           props: {
//             alignBottom: true,
//             behaivor: "next_node",
//             text: "Siguiente",
//           },
//         },
//       ],
//     },
//     {
//       name: "Questions 1",
//       description: "Questions 1",
//       slug: "questions-1",
//       widgets: [
//         {
//           widgetFamily: "content",
//           template: "rich_text",
//           props: {
//             content: "## Algo algo respondé",
//           },
//         },
//         {
//           widgetFamily: "response",
//           template: "rating",
//           props: {
//             dataKey: "wild-6",
//             required: true,
//             optionsLabel: [
//               {
//                 label: "Completamente en desacuerdo",
//                 value: "1",
//               },
//               {
//                 label: "En desacuerdo",
//                 value: "2",
//               },
//               {
//                 label: "Neutral",
//                 value: "3",
//               },
//               {
//                 label: "De acuerdo",
//                 value: "4",
//               },
//               {
//                 label: "Completamente de acuerdo",
//                 value: "5",
//               },
//             ],
//             max: 5,
//             label: "I sometimes get into dangerous situations.",
//           },
//         },
//         {
//           widgetFamily: "response",
//           template: "rating",
//           props: {
//             dataKey: "wild-3",
//             required: true,
//             optionsLabel: [
//               {
//                 label: "Completamente en desacuerdo",
//                 value: "1",
//               },
//               {
//                 label: "En desacuerdo",
//                 value: "2",
//               },
//               {
//                 label: "Neutral",
//                 value: "3",
//               },
//               {
//                 label: "De acuerdo",
//                 value: "4",
//               },
//               {
//                 label: "Completamente de acuerdo",
//                 value: "5",
//               },
//             ],
//             max: 5,
//             label:
//               "I’ve been in more fights than most people of my age and gender.",
//           },
//         },
//         {
//           widgetFamily: "response",
//           template: "rating",
//           props: {
//             dataKey: "mean-1",
//             required: true,
//             optionsLabel: [
//               {
//                 label: "Completamente en desacuerdo",
//                 value: "1",
//               },
//               {
//                 label: "En desacuerdo",
//                 value: "2",
//               },
//               {
//                 label: "Neutral",
//                 value: "3",
//               },
//               {
//                 label: "De acuerdo",
//                 value: "4",
//               },
//               {
//                 label: "Completamente de acuerdo",
//                 value: "5",
//               },
//             ],
//             max: 5,
//             label: "Watching a fist-fight excites me.",
//           },
//         },
//         {
//           widgetFamily: "response",
//           template: "rating",
//           props: {
//             dataKey: "special-4",
//             required: true,
//             optionsLabel: [
//               {
//                 label: "Completamente en desacuerdo",
//                 value: "1",
//               },
//               {
//                 label: "En desacuerdo",
//                 value: "2",
//               },
//               {
//                 label: "Neutral",
//                 value: "3",
//               },
//               {
//                 label: "De acuerdo",
//                 value: "4",
//               },
//               {
//                 label: "Completamente de acuerdo",
//                 value: "5",
//               },
//             ],
//             max: 5,
//             label:
//               "I know that I am special because people keep telling me so.",
//           },
//         },
//         {
//           widgetFamily: "response",
//           template: "rating",
//           props: {
//             dataKey: "special-2",
//             required: true,
//             optionsLabel: [
//               {
//                 label: "Completamente en desacuerdo",
//                 value: "1",
//               },
//               {
//                 label: "En desacuerdo",
//                 value: "2",
//               },
//               {
//                 label: "Neutral",
//                 value: "3",
//               },
//               {
//                 label: "De acuerdo",
//                 value: "4",
//               },
//               {
//                 label: "Completamente de acuerdo",
//                 value: "5",
//               },
//             ],
//             max: 5,
//             label: "I have a unique talent for persuading people.",
//           },
//         },
//         {
//           widgetFamily: "response",
//           template: "rating",
//           props: {
//             dataKey: "craft-2",
//             required: true,
//             optionsLabel: [
//               {
//                 label: "Completamente en desacuerdo",
//                 value: "1",
//               },
//               {
//                 label: "En desacuerdo",
//                 value: "2",
//               },
//               {
//                 label: "Neutral",
//                 value: "3",
//               },
//               {
//                 label: "De acuerdo",
//                 value: "4",
//               },
//               {
//                 label: "Completamente de acuerdo",
//                 value: "5",
//               },
//             ],
//             max: 5,
//             label:
//               "Whatever it takes, you must get the important people on your side.",
//           },
//         },
//         {
//           widgetFamily: "response",
//           template: "rating",
//           props: {
//             dataKey: "wild-7",
//             required: true,
//             optionsLabel: [
//               {
//                 label: "Completamente en desacuerdo",
//                 value: "1",
//               },
//               {
//                 label: "En desacuerdo",
//                 value: "2",
//               },
//               {
//                 label: "Neutral",
//                 value: "3",
//               },
//               {
//                 label: "De acuerdo",
//                 value: "4",
//               },
//               {
//                 label: "Completamente de acuerdo",
//                 value: "5",
//               },
//             ],
//             max: 5,
//             label: "People who mess with me always regret it.",
//           },
//         },
//         {
//           widgetFamily: "layout",
//           template: "button",
//           props: {
//             alignBottom: true,
//             behaivor: "next_node",
//             text: "Siguiente",
//           },
//         },
//       ],
//     },
//     {
//       name: "Questions 2",
//       description: "Questions 2",
//       slug: "questions-2",
//       widgets: [
//         {
//           widgetFamily: "content",
//           template: "rich_text",
//           props: {
//             content: "## Algo algo respondé",
//           },
//         },
//         {
//           widgetFamily: "response",
//           template: "rating",
//           props: {
//             dataKey: "special-3",
//             required: true,
//             optionsLabel: [
//               {
//                 label: "Completamente en desacuerdo",
//                 value: "1",
//               },
//               {
//                 label: "En desacuerdo",
//                 value: "2",
//               },
//               {
//                 label: "Neutral",
//                 value: "3",
//               },
//               {
//                 label: "De acuerdo",
//                 value: "4",
//               },
//               {
//                 label: "Completamente de acuerdo",
//                 value: "5",
//               },
//             ],
//             max: 5,
//             label: "Group activities tend to be dull without me.",
//           },
//         },
//         {
//           widgetFamily: "response",
//           template: "rating",
//           props: {
//             dataKey: "mean-5",
//             required: true,
//             optionsLabel: [
//               {
//                 label: "Completamente en desacuerdo",
//                 value: "1",
//               },
//               {
//                 label: "En desacuerdo",
//                 value: "2",
//               },
//               {
//                 label: "Neutral",
//                 value: "3",
//               },
//               {
//                 label: "De acuerdo",
//                 value: "4",
//               },
//               {
//                 label: "Completamente de acuerdo",
//                 value: "5",
//               },
//             ],
//             max: 5,
//             label: "Some people deserve to suffer.",
//           },
//         },
//         {
//           widgetFamily: "response",
//           template: "rating",
//           props: {
//             dataKey: "special-5",
//             required: true,
//             optionsLabel: [
//               {
//                 label: "Completamente en desacuerdo",
//                 value: "1",
//               },
//               {
//                 label: "En desacuerdo",
//                 value: "2",
//               },
//               {
//                 label: "Neutral",
//                 value: "3",
//               },
//               {
//                 label: "De acuerdo",
//                 value: "4",
//               },
//               {
//                 label: "Completamente de acuerdo",
//                 value: "5",
//               },
//             ],
//             max: 5,
//             label: "I have some exceptional qualities",
//           },
//         },
//         {
//           widgetFamily: "response",
//           template: "rating",
//           props: {
//             dataKey: "wild-2",
//             required: true,
//             optionsLabel: [
//               {
//                 label: "Completamente en desacuerdo",
//                 value: "1",
//               },
//               {
//                 label: "En desacuerdo",
//                 value: "2",
//               },
//               {
//                 label: "Neutral",
//                 value: "3",
//               },
//               {
//                 label: "De acuerdo",
//                 value: "4",
//               },
//               {
//                 label: "Completamente de acuerdo",
//                 value: "5",
//               },
//             ],
//             max: 5,
//             label: "I tend to fight against authorities and their rules.",
//           },
//         },
//         {
//           widgetFamily: "response",
//           template: "rating",
//           props: {
//             dataKey: "wild-4",
//             required: true,
//             optionsLabel: [
//               {
//                 label: "Completamente en desacuerdo",
//                 value: "1",
//               },
//               {
//                 label: "En desacuerdo",
//                 value: "2",
//               },
//               {
//                 label: "Neutral",
//                 value: "3",
//               },
//               {
//                 label: "De acuerdo",
//                 value: "4",
//               },
//               {
//                 label: "Completamente de acuerdo",
//                 value: "5",
//               },
//             ],
//             max: 5,
//             label: "I tend to dive in and then ask questions.",
//           },
//         },
//         {
//           widgetFamily: "response",
//           template: "rating",
//           props: {
//             dataKey: "craft-7",
//             required: true,
//             optionsLabel: [
//               {
//                 label: "Completamente en desacuerdo",
//                 value: "1",
//               },
//               {
//                 label: "En desacuerdo",
//                 value: "2",
//               },
//               {
//                 label: "Neutral",
//                 value: "3",
//               },
//               {
//                 label: "De acuerdo",
//                 value: "4",
//               },
//               {
//                 label: "Completamente de acuerdo",
//                 value: "5",
//               },
//             ],
//             max: 5,
//             label: "I love it when a tricky plan succeeds.",
//           },
//         },
//         {
//           widgetFamily: "response",
//           template: "rating",
//           props: {
//             dataKey: "mean-2",
//             required: true,
//             optionsLabel: [
//               {
//                 label: "Completamente en desacuerdo",
//                 value: "1",
//               },
//               {
//                 label: "En desacuerdo",
//                 value: "2",
//               },
//               {
//                 label: "Neutral",
//                 value: "3",
//               },
//               {
//                 label: "De acuerdo",
//                 value: "4",
//               },
//               {
//                 label: "Completamente de acuerdo",
//                 value: "5",
//               },
//             ],
//             max: 5,
//             label: "I really enjoy violent films and video games.",
//           },
//         },
//         {
//           widgetFamily: "layout",
//           template: "button",
//           props: {
//             alignBottom: true,
//             behaivor: "next_node",
//             text: "Siguiente",
//           },
//         },
//       ],
//     },
//     {
//       name: "Questions 3",
//       description: "Questions 3",
//       slug: "questions-3",
//       widgets: [
//         {
//           widgetFamily: "content",
//           template: "rich_text",
//           props: {
//             content: "## Algo algo respondé",
//           },
//         },
//         {
//           widgetFamily: "response",
//           template: "rating",
//           props: {
//             dataKey: "special-7",
//             required: true,
//             optionsLabel: [
//               {
//                 label: "Completamente en desacuerdo",
//                 value: "1",
//               },
//               {
//                 label: "En desacuerdo",
//                 value: "2",
//               },
//               {
//                 label: "Neutral",
//                 value: "3",
//               },
//               {
//                 label: "De acuerdo",
//                 value: "4",
//               },
//               {
//                 label: "Completamente de acuerdo",
//                 value: "5",
//               },
//             ],
//             max: 5,
//             label: "I like to show off every now and then.",
//           },
//         },
//         {
//           widgetFamily: "response",
//           template: "rating",
//           props: {
//             dataKey: "craft-5",
//             required: true,
//             optionsLabel: [
//               {
//                 label: "Completamente en desacuerdo",
//                 value: "1",
//               },
//               {
//                 label: "En desacuerdo",
//                 value: "2",
//               },
//               {
//                 label: "Neutral",
//                 value: "3",
//               },
//               {
//                 label: "De acuerdo",
//                 value: "4",
//               },
//               {
//                 label: "Completamente de acuerdo",
//                 value: "5",
//               },
//             ],
//             max: 5,
//             label: "Manipulating the situation takes planning.",
//           },
//         },
//         {
//           widgetFamily: "response",
//           template: "rating",
//           props: {
//             dataKey: "craft-4",
//             required: true,
//             optionsLabel: [
//               {
//                 label: "Completamente en desacuerdo",
//                 value: "1",
//               },
//               {
//                 label: "En desacuerdo",
//                 value: "2",
//               },
//               {
//                 label: "Neutral",
//                 value: "3",
//               },
//               {
//                 label: "De acuerdo",
//                 value: "4",
//               },
//               {
//                 label: "Completamente de acuerdo",
//                 value: "5",
//               },
//             ],
//             max: 5,
//             label: "Keep a low profile if you want to get your way.",
//           },
//         },
//         {
//           widgetFamily: "response",
//           template: "rating",
//           props: {
//             dataKey: "special-6",
//             required: true,
//             optionsLabel: [
//               {
//                 label: "Completamente en desacuerdo",
//                 value: "1",
//               },
//               {
//                 label: "En desacuerdo",
//                 value: "2",
//               },
//               {
//                 label: "Neutral",
//                 value: "3",
//               },
//               {
//                 label: "De acuerdo",
//                 value: "4",
//               },
//               {
//                 label: "Completamente de acuerdo",
//                 value: "5",
//               },
//             ],
//             max: 5,
//             label: "I’m likely to become a future star in some area.",
//           },
//         },
//         {
//           widgetFamily: "response",
//           template: "rating",
//           props: {
//             dataKey: "craft-3",
//             required: true,
//             optionsLabel: [
//               {
//                 label: "Completamente en desacuerdo",
//                 value: "1",
//               },
//               {
//                 label: "En desacuerdo",
//                 value: "2",
//               },
//               {
//                 label: "Neutral",
//                 value: "3",
//               },
//               {
//                 label: "De acuerdo",
//                 value: "4",
//               },
//               {
//                 label: "Completamente de acuerdo",
//                 value: "5",
//               },
//             ],
//             max: 5,
//             label:
//               "Avoid direct conflict with others because they may be useful in the future.",
//           },
//         },
//         {
//           widgetFamily: "response",
//           template: "rating",
//           props: {
//             dataKey: "mean-3",
//             required: true,
//             optionsLabel: [
//               {
//                 label: "Completamente en desacuerdo",
//                 value: "1",
//               },
//               {
//                 label: "En desacuerdo",
//                 value: "2",
//               },
//               {
//                 label: "Neutral",
//                 value: "3",
//               },
//               {
//                 label: "De acuerdo",
//                 value: "4",
//               },
//               {
//                 label: "Completamente de acuerdo",
//                 value: "5",
//               },
//             ],
//             max: 5,
//             label: "It’s funny when idiots fall flat on their face.",
//           },
//         },
//         {
//           widgetFamily: "response",
//           template: "rating",
//           props: {
//             dataKey: "wild-5",
//             required: true,
//             optionsLabel: [
//               {
//                 label: "Completamente en desacuerdo",
//                 value: "1",
//               },
//               {
//                 label: "En desacuerdo",
//                 value: "2",
//               },
//               {
//                 label: "Neutral",
//                 value: "3",
//               },
//               {
//                 label: "De acuerdo",
//                 value: "4",
//               },
//               {
//                 label: "Completamente de acuerdo",
//                 value: "5",
//               },
//             ],
//             max: 5,
//             label: "I’ve been in trouble with the law.",
//           },
//         },
//         {
//           widgetFamily: "layout",
//           template: "button",
//           props: {
//             alignBottom: true,
//             behaivor: "next_node",
//             text: "Siguiente",
//           },
//         },
//       ],
//     },
//     {
//       name: "Questions 4",
//       description: "Questions 4",
//       slug: "questions-4",
//       widgets: [
//         {
//           widgetFamily: "content",
//           template: "rich_text",
//           props: {
//             content: "## Algo algo respondé",
//           },
//         },
//         {
//           widgetFamily: "response",
//           template: "rating",
//           props: {
//             dataKey: "wild-1",
//             required: true,
//             optionsLabel: [
//               {
//                 label: "Completamente en desacuerdo",
//                 value: "1",
//               },
//               {
//                 label: "En desacuerdo",
//                 value: "2",
//               },
//               {
//                 label: "Neutral",
//                 value: "3",
//               },
//               {
//                 label: "De acuerdo",
//                 value: "4",
//               },
//               {
//                 label: "Completamente de acuerdo",
//                 value: "5",
//               },
//             ],
//             max: 5,
//             label: "People often say I’m out of control.",
//           },
//         },
//         {
//           widgetFamily: "response",
//           template: "rating",
//           props: {
//             dataKey: "mean-7",
//             required: true,
//             optionsLabel: [
//               {
//                 label: "Completamente en desacuerdo",
//                 value: "1",
//               },
//               {
//                 label: "En desacuerdo",
//                 value: "2",
//               },
//               {
//                 label: "Neutral",
//                 value: "3",
//               },
//               {
//                 label: "De acuerdo",
//                 value: "4",
//               },
//               {
//                 label: "Completamente de acuerdo",
//                 value: "5",
//               },
//             ],
//             max: 5,
//             label: "I know how to hurt someone with words alone.",
//           },
//         },
//         {
//           widgetFamily: "response",
//           template: "rating",
//           props: {
//             dataKey: "craft-6",
//             required: true,
//             optionsLabel: [
//               {
//                 label: "Completamente en desacuerdo",
//                 value: "1",
//               },
//               {
//                 label: "En desacuerdo",
//                 value: "2",
//               },
//               {
//                 label: "Neutral",
//                 value: "3",
//               },
//               {
//                 label: "De acuerdo",
//                 value: "4",
//               },
//               {
//                 label: "Completamente de acuerdo",
//                 value: "5",
//               },
//             ],
//             max: 5,
//             label: "Flattery is a good way to get people on your side.",
//           },
//         },
//         {
//           widgetFamily: "response",
//           template: "rating",
//           props: {
//             dataKey: "craft-1",
//             required: true,
//             optionsLabel: [
//               {
//                 label: "Completamente en desacuerdo",
//                 value: "1",
//               },
//               {
//                 label: "En desacuerdo",
//                 value: "2",
//               },
//               {
//                 label: "Neutral",
//                 value: "3",
//               },
//               {
//                 label: "De acuerdo",
//                 value: "4",
//               },
//               {
//                 label: "Completamente de acuerdo",
//                 value: "5",
//               },
//             ],
//             max: 5,
//             label: "It’s not wise to let people know your secrets.",
//           },
//         },
//         {
//           widgetFamily: "response",
//           template: "rating",
//           props: {
//             dataKey: "special-1",
//             required: true,
//             optionsLabel: [
//               {
//                 label: "Completamente en desacuerdo",
//                 value: "1",
//               },
//               {
//                 label: "En desacuerdo",
//                 value: "2",
//               },
//               {
//                 label: "Neutral",
//                 value: "3",
//               },
//               {
//                 label: "De acuerdo",
//                 value: "4",
//               },
//               {
//                 label: "Completamente de acuerdo",
//                 value: "5",
//               },
//             ],
//             max: 5,
//             label: "People see me as a natural leader.",
//           },
//         },
//         {
//           widgetFamily: "response",
//           template: "rating",
//           props: {
//             dataKey: "mean-6",
//             required: true,
//             optionsLabel: [
//               {
//                 label: "Completamente en desacuerdo",
//                 value: "1",
//               },
//               {
//                 label: "En desacuerdo",
//                 value: "2",
//               },
//               {
//                 label: "Neutral",
//                 value: "3",
//               },
//               {
//                 label: "De acuerdo",
//                 value: "4",
//               },
//               {
//                 label: "Completamente de acuerdo",
//                 value: "5",
//               },
//             ],
//             max: 5,
//             label: "Just for kicks, I’ve said mean things on social media.",
//           },
//         },
//         {
//           widgetFamily: "response",
//           template: "rating",
//           props: {
//             dataKey: "mean-4",
//             required: true,
//             optionsLabel: [
//               {
//                 label: "Completamente en desacuerdo",
//                 value: "1",
//               },
//               {
//                 label: "En desacuerdo",
//                 value: "2",
//               },
//               {
//                 label: "Neutral",
//                 value: "3",
//               },
//               {
//                 label: "De acuerdo",
//                 value: "4",
//               },
//               {
//                 label: "Completamente de acuerdo",
//                 value: "5",
//               },
//             ],
//             max: 5,
//             label: "I enjoy watching violent sports.",
//           },
//         },
//         {
//           widgetFamily: "layout",
//           template: "button",
//           props: {
//             alignBottom: true,
//             behaivor: "next_node",
//             text: "Siguiente",
//           },
//         },
//       ],
//     },
//     {
//       name: "Regressors",
//       description: "Regressors",
//       slug: "regressors",
//       widgets: [
//         {
//           widgetFamily: "content",
//           template: "rich_text",
//           props: {
//             content: "# Regresores",
//           },
//         },
//         {
//           widgetFamily: "response",
//           template: "text_input",
//           props: {
//             label: "Edad",
//             dataKey: "age",
//             required: true,
//           },
//         },
//         {
//           widgetFamily: "response",
//           template: "dropdown",
//           props: {
//             label: "Género",
//             options: [
//               {
//                 label: "Mujer",
//                 value: "mujer",
//               },
//               {
//                 label: "Varón",
//                 value: "varon",
//               },
//               {
//                 label: "No binario",
//                 value: "no_binario",
//               },
//               {
//                 label: "Género fluido",
//                 value: "genero_fluido",
//               },
//               {
//                 label: "Ninguna de las anteriores",
//                 value: "ninguna",
//               },
//               {
//                 label: "Prefiero no decirlo",
//                 value: "prefiero_no_decirlo",
//               },
//             ],
//             dataKey: "genre",
//             required: true,
//           },
//         },
//         {
//           widgetFamily: "layout",
//           template: "button",
//           props: {
//             alignBottom: true,
//             behaivor: "next_node",
//             text: "Siguiente",
//           },
//         },
//       ],
//     },
//   ],
// };
