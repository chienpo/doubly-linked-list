//работаем с указателями
//http://www.internet-technologies.ru/articles/article_2599.html


const Node = require('./node');

class LinkedList {
    
    constructor() {
        this._head = null;
        this._tail = null; 
        this.length = 0;       
    }

    append(data) {
        var node = new Node(data);

        if (!this.length) {
            this._head = node;
            this._tail = node;
        } else {
            this._tail.next = node;
            node.prev = this._tail;
            this._tail = node;
        }
        this.length++;
        return this;
    }

    head() {
        return this._head.data;
    }

    tail() {
        return this._tail.data;
    }

    at(index) {
        var currentNode = this._head,
        length = this.length,
        count = 0,
        message = {failure: 'Failure: non-existent node in this list.'};

        // 1 wrong index 
        if (length === 0 || index < 0 || index > length) {
            throw new Error(message.failure);
        }

        // 2 good index
        while (count < index) {
            currentNode = currentNode.next;
            count++;
        }

        return currentNode.data;
    }

    insertAt(index, data) {
        // New node
        var node = new Node();
        node.data = data;
        // If index 0
        if (index == 0) {
             node.next = this._head;
             return node;
        }
        else {
             var rt = this._head;
             if (rt == null) {
                 return null;
             }
            else {
                while (index > 1) {
                    this._head = this._head.next;
                    index--;
                }
                node.next = this._head.next.next;
                this._head.next = node;
                return rt;
            }
            
        }
    }

    isEmpty() {
        return this._head === null;
    }   

    clear() {
        this._head.data = null;
        this._tail.data = null; 
        this.length = 0; 
    }

    //remove by index
    deleteAt(index) {
        //check for out-of-bounds values
        if (index > 0 && index < this.length){

            var current = this._head,
            i = 0;

            //special case: removing first item
            if (index === 0){
                this._head = current.next;

                if (!this._head){
                    this._tail = null;
                } else {
                    this._head.prev = null;
                }

                //special case: removing last item
                } else if (index === this.length -1){
                    current = this._tail;
                    this._tail = current.prev;
                    this._tail.next = null;
                } else {

                //find the right location
                while(i++ < index){
                    current = current.next;
                }

                //skip over the item to remove
                current.prev.next = current.next;
            }
            //decrement the length
            this.length--;

            //return the value
            return current.data;            

        } else {
            return null;
        }
    }


    reverse() {                 
        var node_buf = {
            data: null,
            next: null,
            prev: null,
        }

        var node_head = this._head;
        var node_tail = this._tail;

        var i = 0;

        while (i < Math.floor(this.length / 2)) { 
            node_buf.data = node_tail.data;
            node_tail.data = node_head.data;
            node_head.data = node_buf.data;
            node_head = node_head.next;
            node_tail = node_tail.prev;
            i++;
        }

        return this;
    }


    indexOf(data) {
        var node = this._head;
        var i = 0;
        var y = -1;
        while (i != this.length) {
            if (node.data == data) {
                return i;
            }
            node = node.next;
            i++;
        }
        return y;
    }

    chaining() {}
}

module.exports = LinkedList;




