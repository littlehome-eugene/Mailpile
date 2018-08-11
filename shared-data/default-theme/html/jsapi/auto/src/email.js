class Email extends React.Component {

  render() {
    let { mid } = this.props
    return (
      <div>
        <Checkbox
          mid={mid}
          />
        <AutoOrderStatus
          mid={mid}
          />
        <AutoReplyStatus
          mid={mid}
          />
        <ManualOrderStatus
          mid={mid}
          />
        <ManualReplyStatus
          mid={mid}
          />
      </div>
    )
  }
}

