import CommonIcon from '_c/common-icon'
export default {
  components: {
    CommonIcon
  },
  methods: {
    showTitle (item) {
      return this.$config.useI18n ? this.$t(item.name) : ((item.meta && item.meta.title) || item.name)
    },
    showChildren (item) {
      return item.children && (item.children.length > 1 || (item.meta && item.meta.showAlways))
    },
    getNameOrHref (item, children0) {
      //return item.url ? `isTurnByHref_${item.url}` : (children0 ? item.children[0].url : item.url)
      return item.url
    }
  }
}