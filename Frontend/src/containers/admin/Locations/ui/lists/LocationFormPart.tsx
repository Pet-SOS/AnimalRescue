import React from "react";
import {LocationsCode} from "../../../../../api/admin";

interface ILocationFormProps {
    onInput: (field: string, event: any) => any;
    values: any;
}

export const LocationFormPart: React.FC<ILocationFormProps> =
    ({
         values,
         onInput,
     }) => {


        const renderInput = (className: string, field: string, placeholder: string, inputType: string = 'text') => {
            return (
                <div className={`col ${className}`}>
                    <input
                        type={inputType}
                        name={field}
                        placeholder={placeholder}
                        onChange={(e) => onInput(field, e)}
                        value={values[field]}
                    />
                </div>
            );
        };

        const renderContact = (className: string = 'col-contact ', placeholder: string = 'Контакт') =>
            renderInput(className, 'title', placeholder);
        const renderPhone = () => renderInput('col-phone', 'phoneNumber', 'Телефон');
        const renderAddress = () => renderInput('col-address', 'address', 'Адреса');
        const renderPrice = () => renderInput('col-price', 'price', 'Ціна');

        const renderClinicPart = () => {
            return (
                <>
                    {renderContact()}
                    {renderPhone()}
                    {renderAddress()}
                </>
            );
        };

        const renderShelterPart = () => {
            return (
                <>
                    {renderContact('col-title', 'Назва')}
                    {renderAddress()}
                </>
            );
        };

        const renderOverdue = () => {
            return (
                <>
                    {renderContact()}
                    {renderPhone()}
                    {renderAddress()}
                    {renderPrice()}
                </>
            );
        };


        const type = values['typeId'];
        return (
            <>
                {type === LocationsCode.CLINIC && renderClinicPart()}
                {type === LocationsCode.SHELTER && renderShelterPart()}
                {type === LocationsCode.OVEREXPOSURE && renderOverdue()}
            </>
        );

    };
