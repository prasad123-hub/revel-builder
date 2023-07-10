"use client"

import React, { useEffect } from "react"
import { FormDetailsContext } from "@/context/formDetailsContext"
import { Form, Project } from "@/types"

import { StepFourForm } from "./forms/steps/step-four-form"
import { StepOneForm } from "./forms/steps/step-one-form"
import { StepThreeForm } from "./forms/steps/step-three-form"
import { StepTwoForm } from "./forms/steps/step-two-form"

interface CustomerFacingFormProps {
  form: Form
  project: Project
}

export function CustomerFacingForm({ form, project }: CustomerFacingFormProps) {
  const { state, dispatch } = React.useContext(FormDetailsContext)

  useEffect(() => {
    dispatch({
      type: "details/company",
      payload: {
        companyName: project.companyName,
        companyLogo: project.companyLogo,
        companyWebsite: project.companyUrl,
      },
    })
    dispatch({
      type: "details/setForm",
      payload: {
        pageTitle: form.pageTitle,
        introMessage: form.introductoryMessage,
        promt: form.promt,
        thankYouMessage: form.thankYouMessage,
      },
    })
    return () => {
      dispatch({ type: "details/reset" })
    }
  }, [form, project])

  return (
    <>
      <div className="">
        {/* <FormPreview /> */}
        {state.steps.step1 ? (
          <StepOneForm />
        ) : state.steps.step2 ? (
          <StepTwoForm />
        ) : state.steps.step3 ? (
          <StepThreeForm formId={form.id} projectId={project.id} />
        ) : state.steps.step4 ? (
          <StepFourForm />
        ) : (
          <StepOneForm />
        )}
      </div>
    </>
  )
}
