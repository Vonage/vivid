const booleanControl = {
    type: 'inline-radio',
    options: { true: '', false: undefined }
};

export const argTypes = {
    open: {
        control: booleanControl
    },
    arrow: {
        control: booleanControl
    },
    strategy: {
        control: {
            type: 'select',
            defaultValue: 'absolute',
            options: ['absolute', 'fixed']
        }
    },
    dismissible: {
        control: booleanControl
    },
    distance: {
        control: {
            type: 'number',
        }
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
