import React, { useEffect, useState } from 'react';
import useForm from '../../../../../shared/hooks/useForm';
import { ILocation, LocationsCode } from '../../../../../api/admin';
import { DEFAULT_LOCATION } from '../../store/state';
import { LocationFormPart } from './LocationFormPart';

interface IPropTypes {
  location?: ILocation;
  onSubmit: (location: ILocation) => void;
  onCancel: () => void;
  locationType: LocationsCode;
}

const initValues = (location?: any, locationType?: LocationsCode) => {
  const getValue = (name: string) => (location && location[name]) || '';
  return {
    ['title']: getValue('title'),
    ['phoneNumber']: getValue('phoneNumber'),
    ['address']: getValue('address'),
    ['price']: getValue('price'),
    ['id']: getValue('id'),
    ['typeId']: getValue('typeId') || locationType || '',
  };
};

export const LocationCellForm: React.FC<IPropTypes> = ({
  onSubmit,
  onCancel,
  location,
  locationType,
}) => {
  const [locationValues, setLocationValues] = useState({
    ...initValues(location, locationType),
  });
  useEffect(() => {
    if (!!location) {
      initFields(locationValues);
    }
  }, []);
  const { fields, handleFieldChange, handleSubmit, initFields } = useForm(
    () => {
      if (fields) {
        onSubmit({
          ...DEFAULT_LOCATION,
          ...fields,
          typeId: locationType,
        });
      }
    },
  );
  const onInput = (fieldName: string, event: any) => {
    handleFieldChange(event);
    setLocationValues({
      ...locationValues,
      [fieldName]: event.target.value,
    });
  };

  return (
    <form className="c-list" onSubmit={handleSubmit}>
      <div className="row">
        <LocationFormPart
          onInput={onInput}
          values={locationValues}
          type={locationType}
        />
        <div className="col col-btn">
          <button className="btn-checked" type="submit">
            Save
          </button>
        </div>
        <div className="col col-btn">
          <button className="cancel" type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};
