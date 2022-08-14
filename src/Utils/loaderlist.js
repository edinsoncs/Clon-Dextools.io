import ContentLoader from "react-content-loader"

const Loaderlist = (props) => (
  <ContentLoader
    speed={2}
    width={400}
    height={150}
    viewBox="-10 0 400 150"
    backgroundColor="#363636"
    foregroundColor="#6b6b6b"
    {...props}
  >
    <circle cx="10" cy="20" r="8" />
    <rect x="25" y="15" rx="5" ry="5" width="220" height="10" />
    <circle cx="10" cy="50" r="8" />
    <rect x="25" y="45" rx="5" ry="5" width="220" height="10" />
    <circle cx="10" cy="80" r="8" />
    <rect x="25" y="75" rx="5" ry="5" width="220" height="10" />
    <circle cx="10" cy="110" r="8" />
    <rect x="25" y="105" rx="5" ry="5" width="220" height="10" />
  </ContentLoader>
)

export default Loaderlist
