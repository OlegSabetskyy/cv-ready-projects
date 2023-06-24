const ConditionalWrapper = ({ wrappers, children }) =>
    wrappers.reduce(
        (children, wrapper) => (wrapper ? wrapper(children) : children),
        children
    );

export default ConditionalWrapper;
