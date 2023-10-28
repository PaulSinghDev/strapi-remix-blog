import { Link } from "@remix-run/react";

//export const loader = async () => {};

export const meta = () => {
  return {
    title: "Tour mum",
    charset: "utf-8",
    viewport: "width=device-width,initial-scale=1",
  };
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Buttface</h1>
      <Link to="/posts">posts</Link>
    </div>
  );
}
