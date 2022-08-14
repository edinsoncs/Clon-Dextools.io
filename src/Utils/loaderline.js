import ContentLoader from "react-content-loader"

const Loaderline = (props) => (
  <ContentLoader
    speed={2}
    width={130}
    height={50}
    viewBox="0 0 170 50"
    backgroundColor="#363636"
    foregroundColor="#6b6b6b"
    {...props}
  >
    <rect x="-5" y="16" rx="5" ry="5" width="178" height="8" />
  </ContentLoader>
)

export default Loaderline
