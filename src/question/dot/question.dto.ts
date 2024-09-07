import { ComponentType } from 'type/type';

export class QuestionDto {
    readonly title: string;
    readonly desc: string;
    readonly js: string;
    readonly css: string;
    readonly isPublished: boolean;
    readonly isStar: boolean;
    readonly isDeleted: boolean;
    readonly componentList: ComponentType[];
}
