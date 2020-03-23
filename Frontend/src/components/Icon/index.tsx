import React from "react";
import "./index.scss"

const Icon: React.FC<{
    text?: string,
    className: string
}> = props => {
    const { text, className = "" } = props;
    return (
        <i className={className}>{text}</i>
    );
};

export default Icon;