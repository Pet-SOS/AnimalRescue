import React from 'react';
import cn from "classnames";
import {SliderItem, ISliderItem} from "./item";
import {ReactComponent as RightImg} from '../../assets/slider/vector-right.svg';
import './index.scss';

interface IPropTypes {
    items: ISliderItem[];
    className?: string;
    numberItems: number;
    speedMs: number;
}

interface IStateTypes {
    currentSection: number[];
    marginLeft: number;
    itemsBlockClientWidth: number;
    numberItems: number;
}

export class Slider extends React.Component<IPropTypes, IStateTypes> {
    constructor(props: IPropTypes) {
        super(props);

        this.state = {
            currentSection: this.initCurrentSection(this.props.numberItems),
            marginLeft: 0,
            itemsBlockClientWidth: 0,
            numberItems: this.props.numberItems,
        }
    }

    static defaultProps = {
        numberItems: 3,
        speedMs: 5,
        items: []
    };

    private sliderRef: HTMLDivElement | null = null;
    private intervalScroll: any = null;

    componentDidMount(): void {
        window.addEventListener('resize', () => {
            const clientWidth = this.getClientWith;
            if (clientWidth < 1014 && clientWidth > 675) {
                return this.setState({numberItems: 2, currentSection: this.initCurrentSection(2)})
            }
            if (this.getClientWith < 675) {
                return this.setState({numberItems: 1, currentSection: this.initCurrentSection(1)})
            }
            return this.setState({
                numberItems: this.props.numberItems,
                currentSection: this.initCurrentSection(this.props.numberItems)
            })
        })
    }


    componentWillUnmount(): void {
        window.removeEventListener('resize', () => {
        })
    }

    initCurrentSection = (numberItems: number = 0) => {
        let currentSection = [];
        for (let i = 0; i < numberItems; i++) {
            currentSection.push(i)
        }
        return currentSection
    };

    clearIntervalScroll = () => {
        if (this.intervalScroll) {
            clearInterval(this.intervalScroll)
        }
    };

    get getClientWith() {
        if (this.sliderRef) {
            return this.sliderRef.clientWidth
        }
        return 0;
    }

    getItemWidth = () => {
        return (this.getClientWith / this.state.numberItems) - 3
    };

    renderItems = () => {
        const {items} = this.props;
        const {currentSection} = this.state;
        if (items && items.length) {
            return items.map((item, index: number) => {
                if (currentSection.indexOf(index) > -1) {
                    return (
                        <SliderItem
                            width={this.getItemWidth()}
                            key={`slider-item_${index}`}
                            {...item}
                        />
                    )
                }
            })
        }
        return null;
    };

    renderNavRight = () => {
        const {items} = this.props;
        const {currentSection} = this.state;
        if (items[currentSection[currentSection.length - 1] + 1])
            return (
                <div onClick={this.nextImg} className="nav right">
                    <RightImg/>
                </div>
            );
        return null
    };

    renderNavLeft = () => {
        const {items} = this.props;
        const {currentSection} = this.state;
        if (items[currentSection[0] - 1])
            return (
                <div onClick={this.prevImg} className="nav left">
                    <RightImg/>
                </div>
            );
        return null
    };

    nextImg = () => {
        const {items, speedMs} = this.props;
        const {currentSection, numberItems} = this.state;
        this.clearIntervalScroll();
        if (currentSection.length > numberItems) {
            currentSection.shift();
        }
        if (items[currentSection[currentSection.length - 1] + 1]) {
            currentSection.push(currentSection[currentSection.length - 1] + 1);
            this.setState({currentSection, marginLeft: 0});
            this.intervalScroll = setInterval(() => {
                const {marginLeft} = this.state;
                if (this.sliderRef && (-marginLeft < (this.getClientWith / numberItems))) {
                    this.setState({marginLeft: marginLeft - 5})
                } else {
                    this.clearIntervalScroll();
                    currentSection.shift();
                    this.setState({marginLeft: 0, currentSection})
                }
            }, speedMs)
        }
    };

    prevImg = () => {
        const {items, speedMs} = this.props;
        const {currentSection, numberItems} = this.state;
        this.clearIntervalScroll();
        if (currentSection.length > numberItems) {
            currentSection.pop();
        }
        if (items[currentSection[0] - 1]) {
            currentSection.unshift(currentSection[0] - 1);
            this.setState({currentSection, marginLeft: -(this.getClientWith / numberItems)});
            this.intervalScroll = setInterval(() => {
                const {marginLeft} = this.state;
                if (this.sliderRef && marginLeft <= 0) {
                    this.setState({marginLeft: marginLeft + 5})
                } else {
                    this.clearIntervalScroll();
                    currentSection.pop();
                    this.setState({marginLeft: 0, currentSection})
                }
            }, speedMs)
        }
    };

    render() {
        const {className} = this.props;
        const {marginLeft} = this.state;
        return (
            <div className={cn(className)}>
                <div className="slider" ref={(ref) => this.sliderRef = ref}>
                    <div className="items-block">
                        <div className="wrapper" style={{marginLeft, width: this.getClientWith}}>
                            {this.renderItems()}
                        </div>
                    </div>
                    {this.renderNavRight()}
                    {this.renderNavLeft()}
                </div>
            </div>
        )
    }
}
