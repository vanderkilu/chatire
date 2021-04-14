import styled from "styled-components";
import { User } from "../types";
import { StyledButton, StyledText } from "./sharedStyles";
import { useToasts } from "react-toast-notifications";
import { PREVENT_USER_CHAT } from "../constants";

const StyledSidebarUser = styled.div<{
  isBlocked: boolean;
}>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: var(--tertiary-color);
  padding: 5px;
  cursor: pointer;
  opacity: ${(props) => (props.isBlocked ? 0.5 : 1)};
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
  toggleUserBlock: (id: string) => void;
}

type ButtonEventType = React.MouseEvent<HTMLButtonElement, MouseEvent>;

const OnlineUser: React.FC<OnlineUserProps> = ({
  user,
  initiateConversation,
  toggleUserBlock,
}) => {
  const { addToast } = useToasts();

  const getUserInitial = (username: string) => {
    return username.charAt(0);
  };

  const handleOnlineUserClick = () => {
    if (user.isBlocked) {
      addToast(PREVENT_USER_CHAT, {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }
    initiateConversation(user.identity);
  };

  const handleOnClick = (e: ButtonEventType) => {
    e.stopPropagation();
    toggleUserBlock(user.identity);
  };

  return (
    <StyledSidebarUser
      onClick={() => handleOnlineUserClick()}
      isBlocked={user.isBlocked}
    >
      <StyledSidebarUserPlaceholder>
        <StyledText color="#ffffff">{getUserInitial(user.username)}</StyledText>
      </StyledSidebarUserPlaceholder>
      <StyledSidebarText> {user.username} </StyledSidebarText>
      <StyledIndicator></StyledIndicator>
      <StyledButton size="small" ml={10} onClick={handleOnClick}>
        {user.isBlocked ? "Unblock" : "Block"}
      </StyledButton>
    </StyledSidebarUser>
  );
};

export default OnlineUser;
