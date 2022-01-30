const booleanControl = {
    type: 'inline-radio',
    options: { true: '', false: undefined }
};

export const argTypes = {
    open: {
        control: booleanControl
    },
    dismissible: {
        control: booleanControl
    },
    corner: {
        control: {
            type: 'select',
            defaultValue: 'right',
            options: [ 'top'
                , 'top-start'
                , 'top-end'
                , 'bottom'
                , 'bottom-start'
                , 'bottom-end'
                , 'right'
                , 'right-start'
                , 'right-end'
                , 'left'
                , 'left-start'
                , 'left-end']

        }
    },
};
