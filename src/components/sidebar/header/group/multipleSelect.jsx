import Select from 'react-select';

export default function MultipleSelect({
  setSelectedUsers,
  searchResults,
  handleSearch,
}) {
  return (
    <div className="mt-4">
      <Select
        options={searchResults}
        onChange={setSelectedUsers}
        onKeyDown={(eve) => handleSearch(eve)}
        placeholder="Search users"
        isMulti
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            border: 'none',
            borderColor: 'transparent',
            background: 'transparent',
          }),
        }}
      />
    </div>
  );
}
