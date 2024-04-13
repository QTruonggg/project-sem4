export interface IFrequentlyQuestionsByAdminResponse {
    frequentlyQuestions: IFrequentlyQuestionByAdminResponse[]
}

export interface IFrequentlyQuestionByAdminResponse {
    id: number,
    question: string,
    answer: string,
    type: string,
    status: string,
}

export interface IFrequentlyQuestionTypeResponse {
    frequentlyQuestionTypes: string[]
}

export interface IFrequentlyQuestionFormUpdateResponse {
    frequentlyQuestionTypes: string[]
    frequentlyQuestion: IFrequentlyQuestionByAdminResponse
}


export interface IFrequentlyQuestionsForCustomer {
    frequentlyQuestions: frequentlyQuestions[]
}

export interface frequentlyQuestions {
    type: string,
    frequentlyQuestions: frequentlyQuestion[]

}
export interface frequentlyQuestion {
    id: number,
    question: string,
    answer: string,
    type: string,
    status: string
}