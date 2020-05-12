import React from "react";

interface IClinicLocationFormProps {
    onInput: (field: string, event: any) => any;
    values: any;
}

export const ShelterLocationFormPart: React.FC<IClinicLocationFormProps> =
    ({
         values,
         onInput,
     }) => {
        return (
            <>
                <div className="col col-contact">
                    <input
                        type='text'
                        name={'title'}
                        placeholder='Контакт'
                        onChange={(e) => onInput('title', e)}
                        value={values['title']}
                    />
                </div>
                <div className="col col-phone">
                    <input
                        type='text'
                        name={'phoneNumber'}
                        placeholder='Телефон'
                        onChange={(e) => onInput('phoneNumber', e)}
                        value={values['phoneNumber']}
                    />
                </div>
                <div className="col col-address">
                    <input
                        type='text'
                        name={'address'}
                        placeholder='Адреса'
                        onChange={(e) => onInput('address', e)}
                        value={values['address']}
                    />
                </div>
            </>
        );

    };
