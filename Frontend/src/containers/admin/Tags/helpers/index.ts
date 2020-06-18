import {FilterType} from "../../../../api/animals";
import {EKindOfAnimal, TagCategory} from "../../../../api/tags";
import {IRequestFilterParams, RequestFilterOperators} from "../../../../api/requestOptions";

export const getLastCategory = (fullName?: string) => {
    if (fullName) {
        let names = fullName.split('/');
        if (!!names && !!names.length) {
            return names[names.length - 1];
        }
    }
    return '';
};
export const buildKindOfAnimal = (category: string, originKindOfAnimal: string) => {
    let targetKindOfAnimal = originKindOfAnimal;
    if (TagCategory.dogSize.toLocaleLowerCase() === category.toLocaleLowerCase()) {
        targetKindOfAnimal = EKindOfAnimal.dog;
    }
    if (TagCategory.kindOfAnimal.toLocaleLowerCase() === category.toLocaleLowerCase() && originKindOfAnimal) {
        targetKindOfAnimal = originKindOfAnimal.toUpperCase();
    }
    return targetKindOfAnimal;
};
export const buildCategory = (category: string, kindOfAnimal: string) => {
    let targetCategory = category;
    if (TagCategory.kindOfAnimal.toLocaleLowerCase() === category.toLocaleLowerCase() && kindOfAnimal) {
        targetCategory = kindOfAnimal.toLocaleLowerCase() + 'Breed';
    }
    return targetCategory;
};
export const buildFilter = (categoryName: string, kindOfAnimal ?: string): IRequestFilterParams | string => {
    if (!kindOfAnimal) {
        return {
            fieldName: 'category',
            operator: RequestFilterOperators.EQ,
            value: categoryName
        }
    } else {
        return `category~eq~'${buildCategory(categoryName, kindOfAnimal)}';kindOfAnimal~eq~'${buildKindOfAnimal(categoryName, kindOfAnimal)}'`;
    }
};
const ignoreAdd = [TagCategory.dogSize.toLocaleLowerCase(), TagCategory.kindOfAnimal.toLocaleLowerCase()];

export const isSupportAdd = (tagCategory: string, kindOfAnimal?: string) =>
    !ignoreAdd.find(v => v === tagCategory.toLocaleLowerCase()) || !!kindOfAnimal;

export const isLevelSupport = (targetCategory: string, kindOfAnimal?: string) =>
    !(FilterType.KIND_OF_ANIMAL.toLocaleLowerCase() === targetCategory.toLocaleLowerCase() && !kindOfAnimal);
