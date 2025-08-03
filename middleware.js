import { NextResponse } from 'next/server'
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";

 
// This function can be marked `async` if using `await` inside
export async function middleware(request) {
    const { isAuthenticated } = getKindeServerSession();

    if (!(await isAuthenticated())) {
        return NextResponse.redirect(new URL('/api/auth/login?post_login_redirect_url=/dashboard', request.url))
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/dashboard/:path*',
}

//
//

  onHandleChange = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  storeItems = (event) => {
    event.preventDefault()
    const { input, items, currentlyEditingIndex } = this.state

    if (input.trim() === "") return;

    if (currentlyEditingIndex !== null) {
      const updatedItems = [...items]
      updatedItems[currentlyEditingIndex] = input
      this.setState({
        items: updatedItems,
        input: "",
        currentlyEditingIndex: null
      })
    } else {
      this.setState({
        items: [...items, input],
        input: ""
      })
    }
  }

  deleteItem = (key) => {
    this.setState({
      items: this.state.items.filter((_, index) => index !== key)
    })
  }

  editItem = (index) => {
    this.setState({
      input: this.state.items[index],
      currentlyEditingIndex: index
    })
  }

  render() {
    const { input, items } = this.state

    return (
      <div className='todo-container'>
        <form onSubmit={this.storeItems}>
          <div className='input-section'>
            <h1>TodoApps</h1>
            <input
              type='text'
              onChange={this.onHandleChange}
              placeholder='Enter Items'
              value={input}
            />
          </div>
          <ul>
            {items.map((data, index) => (
              <li key={index}>
                <span>{data}</span>
                <div> </div>
              </li>
            ))}
          </ul>
        </form>
      </div>
    )
  }
