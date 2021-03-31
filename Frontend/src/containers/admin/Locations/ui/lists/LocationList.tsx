import React from 'react';
import { ICustomAppState } from '../../../../../store/state';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { actionAdminFetchLocationsRequest } from '../../store/actions';
import { actionAdminHomeFetchAnimalsRequest } from '../../../../admin/Home/store/actions';
import { IAnimalsResponse } from '../../../../../api/animals';
import {
  ILocation,
  ILocationsResponse,
  LocationsCode,
} from '../../../../../api/admin';
import { IRequestParams, RequestFilterOperators } from '../../../../../api/requestOptions';
import {
  isLoadingAdminLocations,
  selectAdminLocationsList,
} from '../../store/selectors';
import { selectAnimalsList } from '../../../Home/store/selectors/index';
import { DEFAULT_LOCATION } from '../../store/state';

interface ILocationListProps {
  type: LocationsCode;
  className?: string;
  renderHeader: () => any;
  renderItem?: (key: string, item: ILocation) => any;
}

interface ILocationListOwnProps {
  fetchAnimalsRequest: (params?: IRequestParams) => void;
  loadLocations: (code: LocationsCode, p?: IRequestParams) => void;
  animalsList: IAnimalsResponse;
  listResponse?: ILocationsResponse;
  isLoading: boolean;
}

const EMPTY_LIST_VALUE = '...';

export class LocationList extends React.PureComponent<
  ILocationListProps & ILocationListOwnProps
> {
  componentDidMount(): void {
    if (!this.props.listResponse?.data) {
      this.props.loadLocations(this.props.type);
      this.props.fetchAnimalsRequest();
    }
  }

  componentDidUpdate(prevProps: ILocationListOwnProps) {
    const { animalsList } = this.props;
    if (prevProps.animalsList.pageSize !== animalsList.pageSize) {
      this.props.fetchAnimalsRequest({
        size: animalsList.totalCount,
      });
    }
  }

  renderNewItem = () => {
    const { renderItem } = this.props;
    if (renderItem) {
      return (
        <>
          {renderItem('new', {
            ...DEFAULT_LOCATION,
            typeId: String(this.props.type),
            title: '+ нова локація',
            phoneNumber: EMPTY_LIST_VALUE,
            address: EMPTY_LIST_VALUE,
            price: EMPTY_LIST_VALUE,
            addClassName: 'location-new',
          })}
        </>
      );
    }
  };

  renderList = () => {
    const { listResponse, renderItem } = this.props;
    const list = (listResponse || {}).data;
    return (
      <>
        {renderItem &&
          list &&
          list.map((item, index) => renderItem(String(index), item))}
        {this.renderNewItem()}
      </>
    );
  };

  render() {
    return (
      <div className="section-table-wrapper">
        <section className="section-table location-table">
          <header>
            <div className={`row ${this.props.className}`}>
              {this.props.renderHeader()}
            </div>
          </header>
          {!this.props.isLoading && this.renderList()}
        </section>
      </div>
    );
  }
}

const mapStateToProps = (
  state: ICustomAppState,
  ownProps?: ILocationListProps,
) => {
  const type = ownProps && ownProps.type;
  return {
    animalsList: selectAnimalsList(state),
    listResponse: selectAdminLocationsList(state, type),
    isLoading: isLoadingAdminLocations(state, type),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      loadLocations: actionAdminFetchLocationsRequest,
      fetchAnimalsRequest: actionAdminHomeFetchAnimalsRequest,
    },
    dispatch,
  );
};

export const LocationListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocationList);
