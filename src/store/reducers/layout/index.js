const initialState = {
    layoutType: "vertical",
    topbarTheme: "dark",
    leftSideBarTheme: "dark",
    layoutWidth: "fluid",
    leftSideBarType: "default",
    isPreloader: false,
    is_toggle: true,
    show_rightsidebar: false,
    isMobile: false
}

const layoutReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return { ...state };
    }
}

export default layoutReducer;