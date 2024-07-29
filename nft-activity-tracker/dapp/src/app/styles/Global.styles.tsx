import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
        font-family: Source Sans Pro;
        transition: 350ms linear;
        color: ${({
          theme: {
            color: { purple01 },
          },
        }) => purple01};

        // variables
        --three-px: 3px;
        --seven-px: 7px;
        --ten-px: 10px;
    }

    body {
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: ${({
          theme: {
            assets: { appBg },
            color: { black01, blue03, purple01 },
          },
        }) =>
          `linear-gradient(to top, ${blue03}C6,${black01}CF,${black01}FF), url(${appBg.src})`};
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
`;
