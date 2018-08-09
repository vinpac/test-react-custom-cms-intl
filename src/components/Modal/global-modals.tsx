const Authentication: React.SFC<{ onClose: () => void }> = ({ onClose }) => (
  <div>
    <button onClick={onClose}>Close</button>
  </div>
)

export default {
  Authentication,
}
