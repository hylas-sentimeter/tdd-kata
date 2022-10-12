export function isBalancedBracket(input: string): string {
    if(!input) return ''
    const stack = new Array<string>();
    for (const char of input) {
        if(char === '[') {
            stack.push(char);
        }else {
            if(stack.length > 0 && stack[stack.length - 1] === '[') {
                stack.pop();
            }else {
                return 'Fail'
            }
        }
    }
    if(stack.length > 0) return 'Fail'
    return 'Success'
}