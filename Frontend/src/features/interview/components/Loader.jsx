import React from 'react'

const Loader = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-gray-100 via-gray-200 to-gray-300">
            


                
                
                   
                    {/* Animated dots */}
                    <div className="flex items-center justify-center gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
               

            
        </div>
    )
}

export default Loader
