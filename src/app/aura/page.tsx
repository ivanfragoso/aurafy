"use client"

import AuraCard from "@/components/aura-card"
import axios from "axios"

export default function Aura() {
    const auraCards = [
        {
            'title': 'Based on artists',
            'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur diam ligula, interdum eu lorem in, sollicitudin mattis risus. Nullam consequat neque vel efficitur bibendum. Ut vitae auctor lectus. Donec sit amet tincidunt augue. Aenean egestas libero eu turpis gravida, at euismod quam sollicitudin. Nam rutrum quam tortor, quis lobortis dolor consequat vel. In nec malesuada enim. Aliquam vel mollis nunc, ac pulvinar neque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus justo lorem, scelerisque a magna id, tempus pulvinar ante.',
            'type': 'artists'
        },
        {
            'title': 'Based on tracks',
            'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur diam ligula, interdum eu lorem in, sollicitudin mattis risus. Nullam consequat neque vel efficitur bibendum. Ut vitae auctor lectus. Donec sit amet tincidunt augue. Aenean egestas libero eu turpis gravida, at euismod quam sollicitudin. Nam rutrum quam tortor, quis lobortis dolor consequat vel. In nec malesuada enim. Aliquam vel mollis nunc, ac pulvinar neque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus justo lorem, scelerisque a magna id, tempus pulvinar ante.',
            'type': 'tracks'
        }
    ]

    const handleClick = async (type: string) => {
        const result = await axios.get('/api/aura', {
            params: {
                'type': type
            }
        })

        console.log(result.data.aura)
    }

    return (
        <div className="flex justify-center gap-4 h-full items-center">
            {auraCards.map((auraCard, index) => (
                <AuraCard
                    key={index}
                    title={auraCard.title}
                    description={auraCard.description}
                    btnClick={() => handleClick(auraCard.type)}
                />
            ))}
        </div>
    )
}
