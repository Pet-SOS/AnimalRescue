import React, {useState} from "react";
import {IAnimal} from "../../api/animals";


export const AnimalCard: React.FC<IAnimal> = (props: IAnimal) => {

    const {
        number, name, kindOfAnimal, gender, description, age, imageIds, tags, id
    } = props
    return (
        <>
            <div>number {number}</div>
            <div>name {name}</div>
            <div>kindOfAnimal {kindOfAnimal}</div>
            <div>gender {gender}</div>
            <div>description {description}</div>
            <div>age {age}</div>
            <div>imageLinks {imageIds}</div>
            <div>tags {tags}</div>
            <div>id {id}</div>
            <div>description {description}</div>
            <button>EDIT</button>

        </>)
}
