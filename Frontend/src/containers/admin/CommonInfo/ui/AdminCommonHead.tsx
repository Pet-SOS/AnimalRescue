import React from "react";
import { ISocialLinks, IEmails, IAddresses, addInfoContacts } from "../../../../api/contacts";
import { addInfoCard, IDataBankCard } from "../../../../api/infoCard";
import _ from "lodash";
import {HtmlEditor, styleCard} from "../../../../components/HtmlEditor";

type language = 'ukr' | 'en' | 'deu' | 'ru';

const tr = {
    ukr: {
        contactInformation: 'Контактна інформація',
        hotlinePhone: 'Телефон гарячої лінії',
        adoptionPhone: 'Телефон адопції',
        email: 'Електронна адреса',
        address: 'Адреса',
        country: 'Країна',
        city: 'Місто',
        street: 'Вулиця',
        bankCards: 'Банківські картки',
        socialNetworks: 'Соц.мережі',
        saveChanges: 'Зберегти зміни',
    },
    en: {
        contactInformation: 'Contact Information',
        hotlinePhone: 'Hotline phone',
        adoptionPhone: 'Phone adoption',
        email: 'E-mail address',
        address: 'Address',
        country: 'Country',
        city: 'City',
        street: 'Street',
        bankCards: 'Bank cards',
        socialNetworks: 'Social networks',
        saveChanges: 'Save changes',
    },
    deu: {
        contactInformation: 'Kontaktinformation',
        hotlinePhone: 'Hotline-Telefon',
        adoptionPhone: 'Telefonische Adoption',
        email: 'E-Mail-Addresse',
        address: 'Adresse',
        country: 'Land',
        city: 'Stadt',
        street: 'Straße',
        bankCards: 'Bankkarten',
        socialNetworks: 'Soziale Netzwerke',
        saveChanges: 'Änderungen speichern',
    },
    ru: {
        contactInformation: 'Контактная информация',
        hotlinePhone: 'Телефон горячей линии',
        adoptionPhone: 'Телефон адопции',
        email: 'Электронный адрес',
        address: 'Адрес',
        country: 'Страна',
        city: 'Город',
        street: 'Улица',
        bankCards: 'Банковские карты',
        socialNetworks: 'Соц.сети',
        saveChanges: 'Сохранить изменения',
    },
};

interface IPropTypes {
    language: language;
    socialLinks: ISocialLinks;
    phones: string[];
    emails: IEmails;
    addresses: IAddresses;
    infoCard: IDataBankCard;
}
interface IState {
    socialLinks: ISocialLinks;
    phones: {
        [key:string]:string;
    };
    emails: IEmails;
    addresses: IAddresses;
    infoCard:{
        body:string;
    };
    editorCardState: string;
}
export class AdminCommonHead extends React.Component<IPropTypes, IState> {
    constructor(props: IPropTypes) {
        super(props);
        this.state = {
            socialLinks: {
                instagram: this.props.socialLinks.instagram,
                facebook: this.props.socialLinks.facebook,
                youtube: this.props.socialLinks.youtube
            },
            phones: {
                phone1: this.props.phones[0],
                phone2: this.props.phones[1],
                phone3: this.props.phones[2],
                phone4: this.props.phones[3],
            },
            emails: {
                animalRescue1: this.props.emails.animalRescue1
            },
            addresses:{
                country: this.props.addresses.country,
                town: this.props.addresses.town,
                street: this.props.addresses.street
            },
            infoCard:{
                body: this.props.infoCard.body,
            },
            editorCardState: this.props.infoCard.body,
        };
    }
    handleContactInfo = (e:React.ChangeEvent<HTMLInputElement>, key:string) => {
        this.setState({
            phones: {
                ...this.state.phones,
                [key]: e.target.value
            }
        })
    }
    handleChangeSocialNetworks = (e:React.ChangeEvent<HTMLInputElement>, key:string) => {
        this.setState({
            socialLinks: {
                ...this.state.socialLinks,
                [key]: e.target.value
            }
        })
    }
    handleEmailInfo = (e:React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state,
            emails: {
                animalRescue1: e.target.value
            }
        })
    }
    handleAddress = (e:React.ChangeEvent<HTMLInputElement>, key:string) => {
        this.setState({
            addresses: {
                ...this.state.addresses,
                [key]: e.target.value
            }
        })
    }

    componentDidUpdate(prevProps: IPropTypes ) {
        const { infoCard } = this.props;
        if(!_.isEqual(infoCard, prevProps.infoCard)){
        this.setState({
            editorCardState: infoCard.body
        });
        }
    }

    onEditorStateChange = (editorCardState: string) => {
        this.setState({
        editorCardState
        });
    };

    handleSubmit = (e:React.SyntheticEvent<EventTarget>) => {
        e.preventDefault();
        const phonesAll= Object.values(this.state.phones);
        const contacts =  {
            socialLinks: {...this.state.socialLinks},
            phones: [...phonesAll],
            emails:{...this.state.emails},
            addresses: {...this.state.addresses}
        }
        const card = {...this.state.infoCard}
        // const htmlCard = draftToHtmlHelper();
        card.body = this.state.editorCardState;
        addInfoContacts(contacts).then(resp=>console.log(resp));
        addInfoCard(card).then(resp=>console.log(resp));
    }

    render() {
        return (
            <form className="editing-form" onSubmit={(e)=>this.handleSubmit(e)}>
                <h3>{tr[this.props.language].contactInformation}</h3>
                <div className="form-row field-phone-size">
                    <label htmlFor="phone1">{tr[this.props.language].hotlinePhone}</label>
                    <input id="phone1" onChange={(e)=>this.handleContactInfo(e,'phone1')} type="text"  value={this.state.phones.phone1||''}/>
                </div>
                <div className="form-row field-phone-size">
                    <label htmlFor="phone2">{tr[this.props.language].adoptionPhone}</label>
                    <input id="phone2" onChange={(e)=>this.handleContactInfo(e,'phone2')} type="text"  value={this.state.phones.phone2||''} />
                </div>
                <div className="form-row field-phone-size">
                    <label htmlFor="phone3">{tr[this.props.language].adoptionPhone}</label>
                    <input id="phone3"
                        onChange={(e)=>this.handleContactInfo(e,'phone3')}
                        type="text"
                        value={this.state.phones.phone3||''} />
                </div>
                <div className="form-row field-phone-size">
                    <label htmlFor="phone4">{tr[this.props.language].adoptionPhone}</label>
                    <input id="phone4" onChange={(e)=>this.handleContactInfo(e,'phone4')} type="text" value={this.state.phones.phone4||''}/>
                </div>
                <div className="form-row">
                    <label htmlFor="email-info">{tr[this.props.language].email}</label>
                    <input id="email-info" onChange={(e)=>this.handleEmailInfo(e)} type="text" value={this.state.emails.animalRescue1||''}/>
                </div>
                <h4>{tr[this.props.language].address}</h4>
                <div className="form-row">
                    <label htmlFor="address-country">{tr[this.props.language].country}</label>
                    <input id="address-country" onChange={(e)=>this.handleAddress(e,'country')} type="text" value={`${this.state.addresses.country}` ||''}/>
                </div>
                <div className="form-row">
                    <label htmlFor="address-city">{tr[this.props.language].city}</label>
                    <input id="address-city" onChange={(e)=>this.handleAddress(e,'town')} type="text" value={this.state.addresses.town||''}/>
                </div>
                <div className="form-row">
                    <label htmlFor="address-street">{tr[this.props.language].street}</label>
                    <input id="address-street" onChange={(e)=>this.handleAddress(e,'street')} type="text" value={this.state.addresses.street||''}/>
                </div>
                <h4>{tr[this.props.language].bankCards}</h4>
                <div className="form-row">
                    <HtmlEditor
                        editorState={this.state.editorCardState}
                        onChange={this.onEditorStateChange}
                        classList={styleCard}
                    />
                </div>
                <h4>{tr[this.props.language].socialNetworks}</h4>
                <div className="form-row">
                    <label htmlFor="social-facebook">Facebook</label>
                    <input id="social-facebook" onChange={(e)=>this.handleChangeSocialNetworks(e,'facebook')} value={this.state.socialLinks.facebook||''}/>
                </div>
                <div className="form-row">
                    <label htmlFor="social-instagram">Instagram</label>
                    <input id="social-instagram" onChange={(e)=>this.handleChangeSocialNetworks(e,'instagram')} value={this.state.socialLinks.instagram||''}/>
                </div>
                <div className="form-row">
                    <label htmlFor="social-youtube">Youtube</label>
                    <input id="social-youtube" onChange={(e)=>this.handleChangeSocialNetworks(e,'youtube')} value={this.state.socialLinks.youtube||''}/>
                </div>
                <button type="submit" className="btn btn-blue" onSubmit={(e)=>this.handleSubmit(e)}>
                    {tr[this.props.language].saveChanges}
                </button>
            </form>
        );
    }
}
