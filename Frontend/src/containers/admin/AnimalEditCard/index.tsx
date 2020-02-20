import React from "react";
import {DEFAULT_ANIMAL, IAnimal} from "../../../api/animals";
import {BASE_URL} from "../../../api";
import './index.scss'


interface IAnimalCardProps {
    animal: IAnimal,
    deleteAnimal: (id: string) => void
    postAnimal: (animal: IAnimal) => void
    updateAnimal: (params: { animal: IAnimal, id?: string }) => void

}

export class AnimalEditCard extends React.Component<IAnimalCardProps> {

    public state: IAnimal;

    constructor(props: IAnimalCardProps) {
        super(props);
        this.state = {
            number: props.animal.number,
            name: props.animal.name || '',
            kindOfAnimal: props.animal.kindOfAnimal || '',
            gender: props.animal.gender || '',
            description: props.animal.description || '',
            age: props.animal.age,
            imageIds: props.animal.imageIds,
            tags: props.animal.tags || '',
            character: props.animal.character || '',
            birthday: props.animal.birthday || '',
            coverImage: props.animal.coverImage,
            id: props.animal.id,
            images: []
        }
    }

    changeValue = (e: any, key: any) => {
        this.setState({[key]: e.target.value})
    };

    addImage = (e: any) => {
        this.setState({images: [...this.state.images, ...e.target.files]})
    }

    renderImgs = (imageIds: string[]) => imageIds.map(imageId => <img key={imageId} style={{width: 100, height: 100}}
                                                                      src={`${BASE_URL}documents/${imageId}/type/small`}/>)

    submit = () => {
        const animal = {...this.state as IAnimal}
        this.props.updateAnimal({animal, id: this.state.id})
    }
    delete = () => {
        this.props.deleteAnimal(this.state.id || '')
    }
    post = () => {
        const animal = {...this.state as IAnimal}
        this.props.postAnimal(animal)
        this.setState({...DEFAULT_ANIMAL})
    }

    renderFileNames() {
        return this.state.images.map((image: File, i: number) => <div key={image.name + i}>File
            #{i + 1} {image.name}</div>)
    }

    render() {
        const {
            number, name, kindOfAnimal, gender, description, character, coverImage, birthday, age, imageIds, tags, id
        } = this.state
        return (
            <>
                <div>number <input value={number} onChange={(e) => this.changeValue(e, 'number')}/></div>
                <div>name <input value={name} onChange={(e) => this.changeValue(e, 'name')}/></div>
                <div>kindOfAnimal <input value={kindOfAnimal}
                                         onChange={(e) => this.changeValue(e, 'kindOfAnimal')}/></div>
                <div>gender <input value={gender} onChange={(e) => this.changeValue(e, 'gender')}/></div>
                <div>age <input value={age} onChange={(e) => this.changeValue(e, 'age')}/></div>
                <div>birthday <input value={birthday} onChange={(e) => this.changeValue(e, 'birthday')}/></div>
                <div>tags <input value={tags} onChange={(e) => this.changeValue(e, 'tags')}/></div>
                <div>id {id}</div>
                {this.renderImgs(imageIds)}

                <div>images
                    {!!this.state.images.length && this.renderFileNames()}
                    <div className={'add-button'}>
                        <input type={'file'} id={id || 'newFile'} onChange={(e) => this.addImage(e)}
                               className={"add-button hidden"}/>
                        <label htmlFor={id || 'newFile'} className={'add-button button'}>Add file</label>
                    </div>
                </div>
                <div>coverImage <input value={coverImage} onChange={(e) => this.changeValue(e, 'coverImage')}/></div>
                <div>description</div>
                <textarea value={description} onChange={(e) => this.changeValue(e, 'description')}/>
                <div>character</div>
                <textarea value={character} onChange={(e) => this.changeValue(e, 'character')}/>
                {this.state.id ? (
                    <div>
                        <button onClick={this.submit}>SAVE</button>
                        <button onClick={this.delete}>DELETE</button>
                    </div>) : (
                    <div>
                        <button onClick={this.post}>ADD</button>
                    </div>)
                }
            </>)
    }
}
