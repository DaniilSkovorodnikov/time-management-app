import Select, {GroupBase, Props as SelectProps} from 'react-select'

export default function StyledSelect<
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>
>(props: SelectProps<Option, IsMulti, Group>){
    
    return <Select
        {...props}
        styles={{
            control: (base) => ({
                ...base, 
                backgroundColor: 'transparent', 
                border: '1px solid #3d3d3d',
                boxShadow: '',
                ':hover': {
                    ...base[':hover'],
                    border: '1px solid #6a6a6a'
                },
            }),
            indicatorSeparator: (base) => ({...base, backgroundColor: '#3d3d3d'}),
            dropdownIndicator: (base) => ({...base, color: '#434343' }), 
            option: (base) => ({
                ...base,
                backgroundColor: '#1e1e1e',
                color: 'white',
                ':hover': {
                    ...base[':hover'],
                    backgroundColor: '#282828',
                }
            }),
            menuList: (base) => ({
                ...base,
                backgroundColor: '#1e1e1e',
                border: '1px solid #3d3d3d',
                borderRadius: 4,
            }),
            singleValue: (base) => ({
                ...base,
                color: 'white'
            })
        }}
    />
}