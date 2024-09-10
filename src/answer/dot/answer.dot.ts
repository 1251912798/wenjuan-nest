export class answerDto {
    readonly questionId: string;
    readonly answerList: {
        componentId: string; // fe_id
        value: string[];
    }[];
}
