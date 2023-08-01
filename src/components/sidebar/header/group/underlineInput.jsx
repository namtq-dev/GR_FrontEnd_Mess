export default function UnderlineInput({ groupName, setGroupName }) {
  return (
    <div className="mt-4">
      <input
        type="text"
        placeholder="Group name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        className="w-full bg-transparent border-b border-green_1 dark:text-dark_text_1 outline-none pl-1"
      />
    </div>
  );
}
