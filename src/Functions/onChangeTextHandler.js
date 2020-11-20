export default function onChangeTextHandler(type, value) {
    this.setState({
        [type]: value
    })
}