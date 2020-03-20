import React, {useState} from "react";
import {ChangeLocale, TI18n} from "../../../../i18n";
import {Button, ButtonTypes} from "../../../../components/Button";
import {NavLink} from'react-router-dom';
import { store } from "../../../../store";
import { actionIsActivePopup } from "../../Home/store/actions";
import "../styles/menu.scss"
import { RULES_PAGE_LINK } from "../../Rules";
import { HELP_PAGE_LINKS } from "../../HowToHelp";
import { useSelector, shallowEqual } from "react-redux";
import { selectFavoriteAnimalsIds } from "../../Animals/store/selectors";
import { FavoriteCounter } from "../../../../components/FavoriteCounter";
import {SocialLinks} from "../../../../components/SocialLinks";

export const AppMenu: React.FC = () => {
  const favoriteAnimalsIds: string[] = useSelector(() => selectFavoriteAnimalsIds(store.getState()), shallowEqual);
    let initialState = {
        drop1: false,
        drop2: false,
        drop3: false
    }

    let [stateMenu, setStateMenu] = useState(initialState);
    const createNewStateDrop = (key:string, obj:any)=> {
        let newStateDrop= {...obj};
        newStateDrop[key]= !obj[key]
        return newStateDrop
    }
    const openedMenu = (e: any, element: any) =>{
        e.preventDefault();
        e.stopPropagation();
        let nexState ={};
        setStateMenu(prevState => {
            for (const key in prevState ) {
                if (key === element) {
                    nexState = createNewStateDrop(key, prevState);
                }
            }
            return {...prevState, ...nexState};
        })
    }
    const stopFloatinUp =(e:any) :void => {
        e.stopPropagation();
    }

    return (
        <nav className="header-menu" onClick={(e)=> stopFloatinUp(e)}>
            <ul className="nav-list">
                <li className="nav-item">
                    <NavLink to='/'><TI18n keyStr="headerMenuItem0"/></NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to='/animals/page/1'><TI18n keyStr="headerMenuItem2"/></NavLink>
                </li>
                <li className={stateMenu.drop3 ? 'active nav-item drop' : 'nav-item drop'} onClick={(e) => openedMenu(e, 'drop3')}>
                    <NavLink to={HELP_PAGE_LINKS.default} activeClassName="is-active"><span><TI18n keyStr="headerMenuItem3"/></span><i></i></NavLink >
                    <ul className="dropdown" onClick={(e) => stopFloatinUp(e)}>
                        <li>
                            <NavLink to={HELP_PAGE_LINKS.finance} activeClassName="is-active" isActive={(match, location) => (location.pathname + location.search).includes(HELP_PAGE_LINKS.finance)}>
                                <TI18n keyStr="headerMenuItem3Dropdown1"/>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={HELP_PAGE_LINKS.stuff} activeClassName="is-active" isActive={(match, location) => (location.pathname + location.search).includes(HELP_PAGE_LINKS.stuff)}>
                                <TI18n keyStr="headerMenuItem3Dropdown2"/>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={HELP_PAGE_LINKS.volunteering} activeClassName="is-active" isActive={(match, location) => (location.pathname + location.search).includes(HELP_PAGE_LINKS.volunteering)}>
                                <TI18n keyStr="headerMenuItem3Dropdown3"/>
                            </NavLink>
                        </li>
                    </ul>
                </li>
                <li className= {stateMenu.drop1 ? 'active nav-item drop': 'nav-item drop'} onClick={ (e)=> openedMenu(e, 'drop1')}>
                    <NavLink to="/about" activeClassName="is-active"><span><TI18n keyStr="headerMenuItem1"/></span><i></i></NavLink>
                    <ul className="dropdown" onClick={(e)=> stopFloatinUp(e)}>
                        <li>
                            <NavLink
                                to="/about"
                                activeClassName="is-active"
                                isActive={(match, location) => (location.pathname + location.search) === '/about'}>
                                <TI18n keyStr="headerMenuItem1Dropdown1"/>
                            </NavLink>
                        </li>
                        <li><NavLink to={`/about${RULES_PAGE_LINK}`} activeClassName="is-active"><TI18n keyStr="headerMenuItem1Dropdown2"/></NavLink></li>
                        <li><NavLink to="/about/financial-reports" activeClassName="is-active"><TI18n keyStr="headerMenuItem1Dropdown3"/></NavLink></li>
                    </ul>
                </li>
                <li className="nav-item">
                    <NavLink to="/blog/page/1" activeClassName="is-active"><TI18n keyStr="blog"/></NavLink>
                </li>
                <li className="nav-item">
                    <NavLink activeClassName="is-active" to="/contacts"><TI18n keyStr="contacts"/></NavLink>
                </li>
                <li className="nav-item">
                    <NavLink activeClassName="is-active" className="heart" to="/animals?type=favorite">
                        <span><TI18n keyStr="headerMenuItem7"/></span>
                        <FavoriteCounter count={favoriteAnimalsIds.length}/>
                    </NavLink>
                </li>
            </ul>
           <div className="add-content">
               <Button onClick={() => {store.dispatch(actionIsActivePopup(true))
               }}  styleType={ButtonTypes.Blue}>
                   <TI18n keyStr="help"/>
               </Button>
               <div className="box-social-locale-header">
                   <SocialLinks/>
                   <div className="change-locale"><ChangeLocale/></div>
               </div>
           </div>
        </nav>
    )
};
