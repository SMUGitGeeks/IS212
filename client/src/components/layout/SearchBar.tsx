import { AudioOutlined } from '@ant-design/icons';
import { Input} from 'antd';
import { SearchProps } from 'antd/es/input';

const { Search } = Input;
// const suffix = (
//     <AudioOutlined
//       style={{
//         fontSize: 16,
//         color: '#1677ff',
//       }}
//     />
//   );
const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    console.log(value)
};
// const onSearch = (value: String, _e: any) => console.log(value);

function SearchBar() {
    return (
        <Search placeholder="Search Roles" onSearch={onSearch} />
    )
}

export default SearchBar;