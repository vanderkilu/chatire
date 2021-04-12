import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Loader, StyledLoaderContainer } from "./sharedStyles";
import { createUserLocally } from "../api/api";
import { useHistory } from "react-router-dom";

const AuthRedirect: React.FC<{}> = () => {
  const history = useHistory();
  const { user, getAccessTokenSilently } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storeUser = async () => {
      try {
        const token = await getAccessTokenSilently();
        await createUserLocally(user.name, token);
        setIsLoading(false);
        history.push("/chat");
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    storeUser();
  }, []);
  return (
    <>
      {isLoading && (
        <StyledLoaderContainer>
          <Loader />
        </StyledLoaderContainer>
      )}
    </>
  );
};

export default AuthRedirect;
