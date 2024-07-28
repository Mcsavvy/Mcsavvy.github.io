import react from "react";
import Firebase from "./firebase";
const FirebaseContext = react.createContext<Firebase | null>(null);

const withFirebase =
  <P extends object>(Component: React.ComponentType<P>) =>
  (props: P) =>
    (
      <FirebaseContext.Consumer>
        {(firebase) => <Component {...props} firebase={firebase!} />}
      </FirebaseContext.Consumer>
    );

const useFirebase = () => {
  const firebase = react.useContext(FirebaseContext);
  if (!firebase) {
    throw new Error("Firebase not found");
  }
  return firebase;
}

// eslint-disable-next-line react-refresh/only-export-components
export { withFirebase, useFirebase };
export default FirebaseContext;
