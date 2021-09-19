import TextEditor from "../../components/TextEditor";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { useRouter } from "next/router";
import { db } from "../../firebase";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import { getSession, useSession, signOut } from "next-auth/client";
import Login from "../../components/Login";

const Doc = () => {
  const [session] = useSession();

  if (!session) return <Login />;

  const router = useRouter();
  const { id } = router.query;
  const [snapshot, loadingSnapshot] = useDocumentOnce(
    db.collection("userDocs").doc(session.user.email).collection("docs").doc(id)
  );

  // redirect if user tries to access a URL they dont have access to...
  if (!loadingSnapshot && !snapshot?.data()?.filename) {
    router.replace("/");
  }

  return (
    <div>
      <header className="flex justify-between items-center p-3 pb-1">
        <span onClick={() => router.push("/")} className="cursor-pointer">
          <Icon name="description" size="5xl" color="blue" />
        </span>

        <div className="flex-grow px-2">
          <h2>{snapshot?.data()?.filename}</h2>
          <div className="flex items-center text-sm space-x-1 -ml-1 h-8 text-gray-600">
            <p className="option hover:bg-gray-100">File</p>
            <p className="option hover:bg-gray-100">Edit</p>
            <p className="option hover:bg-gray-100">View</p>
            <p className="option hover:bg-gray-100">Insert</p>
            <p className="option hover:bg-gray-100">Formant</p>
            <p className="option hover:bg-gray-100">Tools</p>
          </div>
        </div>
        <Button
          color="lightBlue"
          buttonType="filled"
          size="regular"
          className="hidden md:inline-flex h-10"
          rounded={false}
          block={false}
          iconOnly={false}
          ripple="light"
        >
          <Icon name="people" size="md" />
          SHARE
        </Button>

        <img
          src={session.user.image}
          alt={session.user.name}
          className="rounded-full cursor-pointer h-10 w-10 ml-2"
        />
      </header>

      <TextEditor />
    </div>
  );
};

export default Doc;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};
