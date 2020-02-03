import React from "react";
import {IAnimal, updateAnimal} from "../../../../api/animals";
import {BASE_URL} from "../../../../api";
import './index.scss'


interface IAnimalCardProps {
    animal: IAnimal
}

export class AnimalEditCard extends React.Component<IAnimalCardProps> {

    public state: IAnimal

    constructor(props: IAnimalCardProps) {
        super(props);
        this.state = {
            number: props.animal.number,
            name: props.animal.name,
            kindOfAnimal: props.animal.kindOfAnimal,
            gender: props.animal.gender,
            description: props.animal.description,
            age: props.animal.age,
            imageIds: props.animal.imageIds,
            tags: props.animal.tags,
            id: props.animal.id,
            images: []
        }
    }

    private fileUpload: HTMLInputElement | null = null


    changeValue = (e: any, key: any) => {
        this.setState({[key]: e.target.value})
    };

    addImage = (e: any) => {
        this.setState({images: [...this.state.images, ...e.target.files]})
    }

    renderImgs = (imageIds: string[]) => imageIds.map(imageId => <img key={imageId} style={{width: 100, height: 100}}
                                                                      src={`${BASE_URL}documents/${imageId}/type/medium`}/>)

    submit = () => {
        updateAnimal({animal: this.state as IAnimal})
    }

    renderFileNames() {
        return this.state.images.map((image: File, i: number) => <div key={image.name + i}>File
            #{i + 1} {image.name}</div>)
    }

    render() {
        const {
            number, name, kindOfAnimal, gender, description, age, imageIds, tags, id
        } = this.props.animal
        return (
            <>
                <div>number <input defaultValue={number} onChange={(e) => this.changeValue(e, 'number')}/></div>
                <div>name <input defaultValue={name} onChange={(e) => this.changeValue(e, 'name')}/></div>
                <div>kindOfAnimal <input defaultValue={kindOfAnimal}
                                         onChange={(e) => this.changeValue(e, 'kindOfAnimal')}/></div>
                <div>gender <input defaultValue={gender} onChange={(e) => this.changeValue(e, 'gender')}/></div>
                <div>age <input defaultValue={age} onChange={(e) => this.changeValue(e, 'age')}/></div>
                <div>tags <input defaultValue={tags}/></div>
                <div>id {id}</div>
                {this.renderImgs(imageIds)}

                <div>images
                    {!!this.state.images.length && this.renderFileNames()}
                    <div className={'add-button'}>
                        <input type={'file'} id={id} onChange={(e) => this.addImage(e)}
                               className={"add-button hidden"}/>
                        <label htmlFor={id} className={'add-button button'}>Add file</label>
                    </div>
                </div>
                <div>description</div>
                <textarea defaultValue={description} onChange={(e) => this.changeValue(e, 'description')}/>
                <div>
                    <button onClick={this.submit}>SAVE</button>
                </div>
            </>)
    }
}
