import { h } from 'snabbdom'
import { isArray } from '~/opera/tools'
export default function(v) {
    let options = this.config
    let {name, key, isOpen, checked, children, disabled, isLeaf} = options.request
    let isFold = v[children] && isArray(v[children]) && v[children].length > 0
    let node = null
    let fn = async(type)=>{
        if(!options.icon[type]){
            node = null
        }else if(/\.(jpg|png|gif)$/.test(options.icon[type])){
            node = h('span.eleTree-icon', {style: {'background-image': `url("${options.imgUrl + options.icon[type]}")`, 'background-size': 'contain'}})
        }else if(/^(\.)/.test(options.icon[type])){
            node = h(`span.eleTree-icon${options.icon[type]}`)
        }
    }
    // 当前节点是否是叶子节点
    options.lazy && v[options.request.isLeaf] || !options.lazy && !isFold ? fn('leaf') : fn('fold')
    return node
}