    const js2jscode = (function () {
        function main(target) {
            const targetType = Object.prototype.toString.call(target).match(/\[object\s(.*?)]/)[1]
            let code = ''
            switch (targetType) {
                case 'Object':
                    code += '{\n'
                    for (let k in target) {
                        code += `${k}: ${main(target[k])},\n`
                    }
                    if (code.length > 1) {
                        code = code.slice(0, -1)
                    }
                    code += '\n}'
                    break
                case 'Array':
                    code += '[\n'
                    for (let i = 0; i < target.length; i++) {
                        code += `${main(target[i])},\n`
                    }
                    if (code.length > 1) {
                        code = code.slice(0, -1)
                    }
                    code += '\n]'
                    break
                case 'Function':
                    code = target.toString()
                    if (code[0] !== 'f' && code[1] !== 'u') {
                        code = 'function ' + code
                    }
                    code = code.replace(/\[native\scode\]/, '/* 你的代码 */')
                    break
                case 'String':
                    code = `'${target}'`
                    break
                case 'Number':
                case 'Boolean':
                    code = target
                    break
            }
            return code || JSON.stringify(target)
        }

        return function js2jscode(any) {
            return main(any)
        }
    })()
