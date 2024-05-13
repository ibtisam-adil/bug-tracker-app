import {PropTypes} from 'prop-types' 

const SearchRezultList = ({rezult}) => {
  return (
    <div className="w-full bg-white flex flex-col shadow-md rounded-xl mt-4 max-h-[400px] overflow-y-scroll">
    {rezult.map((r) => (
        <div key={r}>{r}</div>
    ))}
    </div>
  )
}

SearchRezultList.propTypes = {
    rezult: PropTypes.array.isRequired,
}

export default SearchRezultList
