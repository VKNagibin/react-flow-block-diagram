import styled from "styled-components";

const AppWrapper = styled.div`
  width: 1920px;
  height: 1080px;
  background: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const WorkingAreaWrapper = styled.div`
  width: 1472px;
  height: 1048px;
  margin: 16px;
  justify-content: space-between;
  align-items: center;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
`

const FlowContainer = styled.div`
  border-radius: 4px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  width: 1440px;
  margin: 16px;
  height: 920px;
`

const ComponentsArea = styled.div`
  width: 400px;
  height: 1048px;
  padding: 16px 16px 460px 16px;
  margin: 16px 16px 16px 0;
  display: flex;
  flex-wrap: wrap;
  column-gap: 8px;
  background: #FFFFFF;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
`

export {
    AppWrapper,
    WorkingAreaWrapper,
    FlowContainer,
    ComponentsArea
}