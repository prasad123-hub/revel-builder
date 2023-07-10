"use client"

import React, { createContext, useReducer } from "react"

type InitialStateType = {
  companyName: string
  companyLogo: string
  companyWebsite: string
  pageTitle: string
  introMessage: string
  promt: string
  thankYouMessage: string
  steps: {
    step1: boolean
    step2: boolean
    step3: boolean
    step4: boolean
  }
  customerResponse: {
    testimonialText: string
    testimonialRating: number
    customerName: string
    customerEmail: string
    customerAvatar: string
    customerDesignation: string
  }
}

const detailsData: InitialStateType = {
  companyName: "",
  companyLogo: "",
  companyWebsite: "",
  pageTitle: "Share a testimonial!",
  introMessage:
    "We genuinely value your feedback and the opportunity to serve you better. Thank you in advance for taking the time to share your thoughts. Your testimonial will not only make a difference to us but also assist others in making informed decisions about our products/services.",
  promt:
    "Overall, what would you say is the biggest value or advantage of using our product/service?",
  thankYouMessage:
    "Thank you so much for your support! We appreciate your support and we hope you enjoy using our product.",
  steps: {
    step1: true,
    step2: false,
    step3: false,
    step4: false,
  },
  customerResponse: {
    testimonialText: "",
    testimonialRating: 4,
    customerName: "",
    customerEmail: "",
    customerAvatar: "",
    customerDesignation: "",
  },
}

const FormDetailsContext = createContext<{
  state: InitialStateType
  dispatch: React.Dispatch<any>
}>({
  state: detailsData,
  dispatch: () => null,
})

// Reducer Function
function reducer(state: InitialStateType, action: any) {
  switch (action.type) {
    case "details/pageTitle":
      return { ...state, pageTitle: action.payload }
    case "details/introMessage":
      return { ...state, introMessage: action.payload }
    case "details/promt":
      return { ...state, promt: action.payload }
    case "details/thankYouMessage":
      return { ...state, thankYouMessage: action.payload }
    case "details/step1":
      return {
        ...state,
        steps: {
          ...state.steps,
          step1: !state.steps.step1,
          step2: false,
          step3: false,
          step4: false,
        },
      }
    case "details/step2":
      return {
        ...state,
        steps: {
          ...state.steps,
          step1: false,
          step2: !state.steps.step2,
          step3: false,
          step4: false,
        },
      }
    case "details/step3":
      return {
        ...state,
        steps: {
          ...state.steps,
          step1: false,
          step2: false,
          step3: !state.steps.step3,
          step4: false,
        },
      }
    case "details/step4":
      return {
        ...state,
        steps: {
          ...state.steps,
          step1: false,
          step2: false,
          step3: false,
          step4: !state.steps.step4,
        },
      }
    case "details/reset":
      return {
        ...state,
        steps: {
          step1: true,
          step2: false,
          step3: false,
          step4: false,
        },
      }
    case "details/company":
      return {
        ...state,
        companyName: action.payload.companyName,
        companyLogo: action.payload.companyLogo,
        companyWebsite: action.payload.companyWebsite,
      }
    case "details/setForm":
      return {
        ...state,
        pageTitle: action.payload.pageTitle,
        introMessage: action.payload.introMessage,
        promt: action.payload.promt,
        thankYouMessage: action.payload.thankYouMessage,
      }
    case "details/customerResponse/testimonialText":
      return {
        ...state,
        customerResponse: {
          ...state.customerResponse,
          testimonialText: action.payload,
        },
      }
    case "details/customerResponse/testimonialRating":
      return {
        ...state,
        customerResponse: {
          ...state.customerResponse,
          testimonialRating: action.payload,
        },
      }
    default:
      // return error
      throw new Error(`Invalid action type: ${action.type}`)
  }
}

// Provider Component
function FormDetailsProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, detailsData)

  return (
    <FormDetailsContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </FormDetailsContext.Provider>
  )
}

export { FormDetailsContext, FormDetailsProvider }
