import styled from "styled-components";
import { User } from "../types";
import { StyledText } from "./sharedStyles";

const StyledSidebarUser = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: var(--tertiary-color);
  padding: 5px;
  cursor: pointer;
`;
const StyledSidebarUserPlaceholder = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: #424242;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 1rem;
`;
const StyledSidebarText = styled.p`
  color: #ffffff;
  font-size: 1.4rem;
`;
const StyledIndicator = styled.div`
  width: 1rem;
  height: 1rem;
  background-color: #1b5e20;
  border-radius: 50%;
  margin-left: 0.5rem;
`;

interface OnlineUserProps {
  user: User;
  initiateConversation: (id: string) => void;
}

const OnlineUser: React.FC<OnlineUserProps> = ({
  user,
  initiateConversation,
}) => {
  const getUserInitial = (username: string) => {
    return username.charAt(0);
  };

  return (
    <StyledSidebarUser onClick={() => initiateConversation(user.identity)}>
      <StyledSidebarUserPlaceholder>
        <StyledText color="#ffffff">{getUserInitial(user.username)}</StyledText>
      </StyledSidebarUserPlaceholder>
      <StyledSidebarText> {user.username} </StyledSidebarText>
      <StyledIndicator></StyledIndicator>
    </StyledSidebarUser>
  );
};

export default OnlineUser;
