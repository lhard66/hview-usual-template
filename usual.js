this.$confirmSave({
  message: '你刚刚修改了这条记录，是否保存？',
  onOk: () => new Promise((resolve) => {
    this.confirm().then(() => {
      resolve();
      // console.log('okok');
      this.$emit('close', true);
    })
  }),
  onDrop: () => {
    this.$message('数据已丢弃');
    this.$emit('close', true);
  },
});

