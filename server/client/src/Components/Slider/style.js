import { Row } from "antd";
import styled from "styled-components";

export const WrapperBanner = styled(Row)`
    .mainbanner {
        box-shadow: 0 1px 1px 0 rgba(0,0,0,.05);
        border-radius: 0.125rem;
        border-top-left-radius: 2px;
        border-bottom-left-radius: 2px;
        overflow: hidden;
        flex-grow: 2;
        flex-shrink: 1;
        flex-basis: 0;
    }
    .right-banner {
        flex-grow: 1;
        flex-shrink: 1;
        flex-basis: 0;
        border-top-right-radius: 2px;
        border-bottom-right-radius: 2px;
        display: flex;
        flex-direction: column;
        margin-left: 0.3125rem;
        gap: 4px;
    }
    .right-banner .imgsmall {
        position: relative;
        width: auto;
        height: auto;
}
    }
`