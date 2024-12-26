"use client";

import React, { useState } from "react";
import { ChromePicker, ColorResult } from "react-color";
import {
    EyeIcon,
    EyeOffIcon,
    ZoomInIcon,
    ZoomOutIcon,
    ArrowUpIcon,
    ArrowDownIcon,
} from "lucide-react";

const VirtualFittingRoom = () => {
    const [color, setColor] = useState<string>("#FAD082");
    const [showPants, setShowPants] = useState(true);
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [pantsPosition, setPantsPosition] = useState({ x: 0, y: 0 });
    const [pantsSize, setPantsSize] = useState({ width: 150, height: 290 });
    const [isDragging, setIsDragging] = useState(false);
    const [isPantsDragging, setIsPantsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const handleColorChange = (newColor: ColorResult) => {
        setColor(newColor.hex);
    };

    // Body dragging handlers
    const handleMouseDown = (e: any) => {
        if (e.target.closest(".pants-svg")) return;
        setIsDragging(true);
        setDragStart({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
    };

    const handleMouseMove = (e: any) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y,
            });
        }
        if (isPantsDragging) {
            setPantsPosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y,
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setIsPantsDragging(false);
    };

    // Pants dragging handlers
    const handlePantsMouseDown = (e: any) => {
        e.stopPropagation();
        setIsPantsDragging(true);
        setDragStart({
            x: e.clientX - pantsPosition.x,
            y: e.clientY - pantsPosition.y,
        });
    };

    const zoomIn = () => {
        setScale((prev) => Math.min(prev + 0.1, 2));
    };

    const zoomOut = () => {
        setScale((prev) => Math.max(prev - 0.1, 0.5));
    };

    const increasePantsSize = () => {
        setPantsSize((prev) => ({
            width: prev.width * 1.1,
            height: prev.height * 1.1,
        }));
    };

    const decreasePantsSize = () => {
        setPantsSize((prev) => ({
            width: prev.width * 0.9,
            height: prev.height * 0.9,
        }));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="flex flex-col items-center gap-4">
                    <ChromePicker color={color} onChange={handleColorChange} />

                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                            <button
                                onClick={zoomIn}
                                className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                title="Zoom In View"
                            >
                                <ZoomInIcon className="w-5 h-5" />
                            </button>
                            <button
                                onClick={zoomOut}
                                className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                title="Zoom Out View"
                            >
                                <ZoomOutIcon className="w-5 h-5" />
                            </button>
                        </div>

                        {showPants && (
                            <div className="flex gap-2">
                                <button
                                    onClick={increasePantsSize}
                                    className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                    title="Increase Pants Size"
                                >
                                    <ArrowUpIcon className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={decreasePantsSize}
                                    className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                    title="Decrease Pants Size"
                                >
                                    <ArrowDownIcon className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => setShowPants(!showPants)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        {showPants ? (
                            <>
                                <EyeOffIcon className="w-5 h-5" />
                                Hide Pants
                            </>
                        ) : (
                            <>
                                <EyeIcon className="w-5 h-5" />
                                Show Pants
                            </>
                        )}
                    </button>
                </div>

                <div
                    className="relative overflow-hidden border border-gray-300 rounded-lg bg-white"
                    style={{
                        width: "800px",
                        height: "800px",
                        cursor: isDragging ? "grabbing" : "grab",
                    }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    <div
                        className="relative"
                        style={{
                            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                            transformOrigin: "center",
                            transition: isDragging
                                ? "none"
                                : "transform 0.1s ease-out",
                        }}
                    >
                        {/* Body SVG */}
                        <svg
                            width="400"
                            height="600"
                            viewBox="0 0 1075 1363"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect width="1075" height="1363" fill="#F5F5F5" />
                            <circle
                                cx="526.5"
                                cy="100.5"
                                r="100.5"
                                fill={color}
                            />
                            <rect
                                x="491"
                                y="189"
                                width="72"
                                height="96"
                                fill={color}
                            />
                            <rect
                                x="377"
                                y="237"
                                width="299"
                                height="242"
                                fill={color}
                            />
                            <path d="M377 479H676V721H377V479Z" fill={color} />
                            <rect
                                x="377"
                                y="839"
                                width="134"
                                height="524"
                                fill={color}
                            />
                            <rect
                                x="550"
                                y="839"
                                width="126"
                                height="524"
                                fill={color}
                            />
                            <rect
                                x="377"
                                y="721"
                                width="299"
                                height="184"
                                fill={color}
                            />
                            <rect
                                x="377.478"
                                y="237"
                                width="83"
                                height="560"
                                transform="rotate(42.3818 377.478 237)"
                                fill={color}
                            />
                            <rect
                                x="618"
                                y="295.935"
                                width="83"
                                height="560"
                                transform="rotate(-45.2401 618 295.935)"
                                fill={color}
                            />
                        </svg>

                        {/* Pants SVG - Now resizable */}
                        {showPants && (
                            <svg
                                className="pants-svg absolute top-1/2 left-1/2"
                                style={{
                                    transform: `translate(calc(-50% + ${pantsPosition.x}px), calc(-40% + ${pantsPosition.y}px))`,
                                    width: `${pantsSize.width}px`,
                                    height: `${pantsSize.height}px`,
                                    cursor: isPantsDragging
                                        ? "grabbing"
                                        : "grab",
                                    zIndex: 10,
                                    transition:
                                        "width 0.2s ease-out, height 0.2s ease-out",
                                }}
                                viewBox="0 0 299 580"
                                onMouseDown={handlePantsMouseDown}
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect width="142" height="580" fill="#D9D9D9" />
                                <rect
                                    x="161"
                                    width="138"
                                    height="580"
                                    fill="#D9D9D9"
                                />
                                <rect
                                    x="83"
                                    width="153"
                                    height="180"
                                    fill="#D9D9D9"
                                />
                            </svg>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VirtualFittingRoom;
